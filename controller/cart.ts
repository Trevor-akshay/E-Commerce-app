import express from 'express';
import {
	createCartService,
	getCartService,
	getCartsService,
	updateCartService,
	deleteCartService,
} from '../service/cart';
import { cartSchemaImp } from '../models/cart';

const createCart = (request: express.Request, response: express.Response) => {
	const cart = new cartSchemaImp(request.body);
	createCartService(response, cart);
};

const getCart = (request: express.Request, response: express.Response) => {
	getCartService(request, response);
};

const getCarts = (request: express.Request, response: express.Response) => {
	getCartsService(request, response);
};

const updateCart = async (
	request: express.Request,
	response: express.Response
) => {
	try {
		const cart = await cartSchemaImp.findById(request.params.id);
		if (!cart) {
			throw new Error(`Cart with id ${request.params.id} not found`);
		}
		updateCartService(request, response);
	} catch (error: any) {
		response.status(404).json(error.message);
	}
};

const deleteCart = async (
	request: express.Request,
	response: express.Response
) => {
	try {
		const cart = await cartSchemaImp.findById(request.params.id);
		if (!cart) {
			throw new Error(`Cart with id ${request.params.id} not found`);
		}
		deleteCartService(request, response);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

export { createCart, getCart, getCarts, updateCart, deleteCart };
