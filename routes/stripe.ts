import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeRouter = express.Router();

stripeRouter.post(
	'/',
	(request: express.Request, response: express.Response) => {
		stripe.charges.create(
			{
				source: request.body.tokenID,
				amount: request.body.amount,
				currency: 'INR',
			},
			(error: any, res: any) => {
				if (error) {
					response.status(400).json(error.message);
				} else {
					response.status(200).json(res);
				}
			}
		);
	}
);

export { stripeRouter };
