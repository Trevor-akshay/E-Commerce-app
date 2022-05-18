import express from 'express';
import crypto from 'crypto-js';
import {
	createUserService,
	loginUserService,
	getUsersService,
	getUserByEmailService,
	updateUserService,
	deleteUserService,
} from '../service/user';

import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const createUser = (request: express.Request, response: express.Response) => {
	try {
		const user = {
			username: request.body.username,
			email: request.body.email,
			password: crypto.AES.encrypt(
				request.body.password,
				process.env.PASSWORD_HASH + ''
			),
		};
		createUserService(user, response);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const loginUser = (request: express.Request, response: express.Response) => {
	const user = {
		email: request.body.email,
		password: request.body.password,
	};
	loginUserService(user, response);
};

const getUsers = (request: any, response: express.Response) => {
	if (request.user.isAdmin) return getUsersService(response);
	response.status(401).json('Your not authorized to do this operation');
};

const getUserByEmail = (
	request: express.Request,
	response: express.Response
) => {
	getUserByEmailService(request, response);
};

const updateUser = (request: any, response: express.Response) => {
	console.log('here2', request.user, request.params);
	if (request.user.email !== request.params.email)
		return response
			.status(401)
			.json('Your not authorised to do this operation');
	updateUserService(request, response);
};

const deleteUser = (request: any, response: express.Response) => {
	if (request.user.email !== request.params.email)
		return response
			.status(401)
			.json('Your not authorised to do this operation');
	deleteUserService(request, response);
};

export {
	createUser,
	loginUser,
	getUsers,
	getUserByEmail,
	updateUser,
	deleteUser,
};
