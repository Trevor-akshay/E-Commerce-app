import express from 'express';
import { orderSchemaImp } from '../models/order';

const createOrderService = async (
	request: express.Request,
	response: express.Response
) => {
	try {
		const order = new orderSchemaImp(request.body);
		await order.save();
		response.status(201).json(order);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getOrderService = async (request: any, response: express.Response) => {
	try {
		response
			.status(200)
			.json(await orderSchemaImp.find({ userID: request.params.userID }));
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getOrdersService = async (request: any, response: express.Response) => {
	try {
		response.status(200).json(await orderSchemaImp.find());
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const updateOrderService = async (request: any, response: express.Response) => {
	try {
		const cart = await orderSchemaImp.findOneAndUpdate(
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

const deleteOrderService = async (request: any, response: express.Response) => {
	try {
		const cart = await orderSchemaImp.findOneAndDelete({
			_id: request.params.id,
		});
		response.status(200).json(cart);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

export {
	createOrderService,
	getOrderService,
	getOrdersService,
	updateOrderService,
	deleteOrderService,
};
