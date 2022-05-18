import express from 'express';
import jwt from 'jsonwebtoken';
import { userSchemaImp } from '../models/user';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

export const verifyToken = (
	request: any,
	response: express.Response,
	next: any
) => {
	const token = request.headers['x-access-token'];
	if (token) {
		jwt.verify(
			token,
			process.env.JWT_PRIVATE_KEY + '',
			(error: any, user: any) => {
				if (error) {
					response.status(404).json('Invalid token');
					return;
				}
				request.user = user;
				next();
			}
		);
	} else {
		response.status(401).json('Your not authenticated');
	}
};

export const verifyAuthorization = async (
	request: any,
	response: express.Response,
	next: any
) => {
	const user = await userSchemaImp.findOne({ email: request.user.email });
	if (user.isAdmin) {
		next();
	} else {
		response.status(401).json('Your not authorized');
	}
};
