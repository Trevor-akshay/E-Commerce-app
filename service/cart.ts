import express from 'express';
import { cartSchemaImp } from '../models/cart';

const createCartService = async (response: express.Response, cart: any) => {
	try {
		await cart.save();
		response.status(201).json(cart);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getCartService = async (request: any, response: express.Response) => {
	try {
		const cart = await cartSchemaImp.findOne({ _id: request.params.id });
		if (!cart) {
			throw new Error(`Cart with id ${request.params.id} not found`);
		}
		response.status(200).json(cart);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getCartsService = async (request: any, response: express.Response) => {
	try {
		const cart = await cartSchemaImp.find();
		response.status(200).json(cart);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const updateCartService = async (request: any, response: express.Response) => {
	try {
		const cart = await cartSchemaImp.findOneAndUpdate(
			{ _id: request.params.id },
			{
				$set: request.body,
			},
			{ new: true }
		);
		response.status(200).json(cart);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const deleteCartService = async (request: any, response: express.Response) => {
	try {
		const cart = await cartSchemaImp.findOneAndDelete({
			_id: request.params.id,
		});
		response.status(200).json(cart);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

export {
	createCartService,
	getCartService,
	getCartsService,
	updateCartService,
	deleteCartService,
};
