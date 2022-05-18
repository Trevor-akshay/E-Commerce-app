import express from 'express';
import { productSchemaImp } from '../models/product';

const postProductService = async (response: express.Response, product: any) => {
	try {
		response.status(201).json(await product.save());
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getProductsService = async (
	request: express.Request,
	response: express.Response
) => {
	try {
		response.status(200).json(await productSchemaImp.find());
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getProductByTitleService = async (
	response: express.Response,
	title: string
) => {
	try {
		response.status(200).json(await productSchemaImp.find({ title }));
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const getProductsByCategoryService = async (
	response: express.Response,
	category: string
) => {
	try {
		response.status(200).json(await productSchemaImp.find({ category }));
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const updateProductService = async (
	request: express.Request,
	response: express.Response
) => {
	try {
		const product = await productSchemaImp.findOneAndUpdate(
			{ _id: request.params.id },
			{
				$set: request.body,
			},
			{ new: true }
		);
		response.status(200).json(product);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};

const removeProductService = async (
	request: express.Request,
	response: express.Response
) => {
	try {
		const product = await productSchemaImp.findOneAndDelete({
			_id: request.params.id,
		});
		if (!product) {
			throw new Error('Product does not exist');
		}
		response.status(200).json(product);
	} catch (error: any) {
		response.status(400).json(error.message);
	}
};
export {
	postProductService,
	getProductsService,
	getProductByTitleService,
	getProductsByCategoryService,
	updateProductService,
	removeProductService,
};
