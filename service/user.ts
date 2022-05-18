import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { userSchemaImp } from '../models/user';
import crypto from 'crypto-js';
import lodash from 'lodash';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { userTokenVerification } from '../models/userTokenVerification';

dotenv.config({ path: './config/.env' });

const createUserService = async (userData: any, response: express.Response) => {
	try {
		const user = await userSchemaImp.find({ email: userData.email });
		if (user.length) throw new Error('User already exist');
		const newUser = new userSchemaImp(userData);
		await newUser.save();
		response.status(202).json(await sendVerificationEmail(newUser));
	} catch (error: any) {
		response.status(404).json('User already exists');
	}
};

async function sendVerificationEmail(account: any) {
	try {
		const token = jwt.sign(
			{
				username: account.username,
				email: account.email,
				isAdmin: account.isAdmin,
			},
			process.env.JWT_PRIVATE_KEY + ''
		);

		let message: string;
		message = `Please check your email to verify your email address ${account.email}`;
		const mailOptions = {
			from: process.env.AUTH_EMAIL,
			to: account.email,
			subject: 'Verify Email',
			text: `${message}  \n token : ${token}`,
		};

		const newToken = await new userTokenVerification({
			userID: account._id,
			token,
			createdAt: Date.now(),
			expiresAt: Date.now() + 36000,
		});

		await newToken.save();

		const transporter = nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: 'f5b72a0fe35365',
				pass: '3534e3b63d9769',
			},
		});

		await transporter.sendMail(mailOptions);
		return {
			status: 'PENDING',
			message: 'Verification mail sent please check',
			data: {
				userID: account._id,
				email: account.email,
			},
		};
	} catch (error: any) {
		return {
			status: 'FAILED',
			message: error.message,
		};
	}
}

const loginUserService = async (userData: any, response: express.Response) => {
	try {
		const userDB = await userSchemaImp.findOne({ email: userData.email });
		if (!userDB) {
			response
				.status(404)
				.json(
					`User with email : ${userData.email} is not found in the database`
				);
			return;
		}

		const tokenDB = await userTokenVerification.findOne({ userID: userDB._id });
		if (!tokenDB && tokenDB.expiresAt <= Date.now()) {
			userTokenVerification.updateOne(
				{ userID: userDB._id },
				{
					expiresAt: Date.now() + 36000,
				}
			);
			return response.status(404).json('Token has expired please login again');
		}
		const hashedPassword = crypto.AES.decrypt(
			userDB.password,
			process.env.PASSWORD_HASH + ''
		);
		const passwordString = hashedPassword.toString(crypto.enc.Utf8);
		if (passwordString === userData.password) {
			const token = jwt.sign(
				{
					_id: userDB._id,
					username: userDB.username,
					email: userDB.email,
					isAdmin: userDB.isAdmin,
				},
				process.env.JWT_PRIVATE_KEY + ''
			);
			const newToken = await new userTokenVerification({
				userID: userDB._id,
				token,
				createdAt: Date.now(),
				expiresAt: Date.now() + 36000,
			});
			await newToken.save();
			await userSchemaImp.updateOne(
				{ email: userData.email },
				{
					verified: true,
				}
			);
			return response.status(200).send('login successful');
		}
		throw new Error(`Password provided is not correct`);
	} catch (error: any) {
		response.status(404).json(error.message);
	}
};
const getUsersService = async (response: express.Response) => {
	await userSchemaImp.find({}).then((users) => {
		response.status(200).json(users);
	});
};

const getUserByEmailService = async (
	request: express.Request,
	response: express.Response
) => {
	const email = request.params.email;
	try {
		const user = await userSchemaImp.findOne({ email: email });
		if (!user) throw new Error();
		response
			.status(200)
			.json(lodash.pick(user, ['username', 'email', 'isAdmin']));
	} catch (error: any) {
		response.status(404).json(`user with email : ${email} is not available`);
	}
};

const updateUserService = async (request: any, response: express.Response) => {
	const email = request.params.email;
	try {
		const user = await userSchemaImp.findOneAndUpdate(
			{ email: email },
			{
				$set: request.body,
			},
			{ new: true }
		);
		response.status(200).json(user);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const deleteUserService = async (request: any, response: express.Response) => {
	const email = request.params.email;
	try {
		const user = await userSchemaImp.findOneAndRemove({ email: email });
		if (!user) {
			throw new Error('User not found');
		}
		response.status(200).json(user);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

export {
	createUserService,
	loginUserService,
	getUsersService,
	getUserByEmailService,
	updateUserService,
	deleteUserService,
};
