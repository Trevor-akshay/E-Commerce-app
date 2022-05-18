import express from 'express';
import { orderSchemaImp } from '../models/order';
import {
	createOrderService,
	getOrderService,
	getOrdersService,
	updateOrderService,
	deleteOrderService,
} from '../service/order';

const createOrder = (request: any, response: express.Response) => {
	createOrderService(request, response);
};

const getOrder = (request: express.Request, response: express.Response) => {
	getOrderService(request, response);
};

const getOrders = (request: express.Request, response: express.Response) => {
	getOrdersService(request, response);
};

const updateOrder = async (
	request: express.Request,
	response: express.Response
) => {
	updateOrderService(request, response);
};

const removeOrder = async (
	request: express.Request,
	response: express.Response
) => {
	deleteOrderService(request, response);
};

export { createOrder, getOrder, getOrders, updateOrder, removeOrder };
