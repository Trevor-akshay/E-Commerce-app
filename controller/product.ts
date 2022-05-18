import express from 'express';
import { productSchemaImp } from '../models/product';
import {
	postProductService,
	getProductsService,
	getProductByTitleService,
	getProductsByCategoryService,
	updateProductService,
	removeProductService,
} from '../service/product';

const postProduct = (request: express.Request, response: express.Response) => {
	const product = new productSchemaImp({
		title: request.body.title,
		description: request.body.description,
		image: request.body.image,
		category: request.body.category,
		price: parseInt(request.body.price),
	});
	postProductService(response, product);
};

const getProducts = (request: express.Request, response: express.Response) => {
	getProductsService(request, response);
};

const getProductByTitle = (
	request: express.Request,
	response: express.Response
) => {
	getProductByTitleService(response, request.params.title);
};

const getProductsByCategory = (
	request: express.Request,
	response: express.Response
) => {
	getProductsByCategoryService(response, request.params.category);
};

const updateProduct = async (
	request: express.Request,
	response: express.Response
) => {
	updateProductService(request, response);
};

const removeProduct = async (
	request: express.Request,
	response: express.Response
) => {
	removeProductService(request, response);
};

export {
	postProduct,
	getProducts,
	getProductByTitle,
	getProductsByCategory,
	updateProduct,
	removeProduct,
};
