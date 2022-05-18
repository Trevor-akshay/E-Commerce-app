import express from 'express';
import { verifyToken, verifyAuthorization } from '../middleware/auth';

import {
	postProduct,
	getProducts,
	getProductByTitle,
	getProductsByCategory,
	updateProduct,
	removeProduct,
} from '../controller/product';
const productRouter = express.Router();

productRouter.post(
	'/',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		postProduct(request, response);
	}
);

productRouter.get(
	'/',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		getProducts(request, response);
	}
);

productRouter.get(
	'/title/:title',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		getProductByTitle(request, response);
	}
);

productRouter.get(
	'/category/:category',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		getProductsByCategory(request, response);
	}
);

productRouter.put(
	'/:id',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		updateProduct(request, response);
	}
);

productRouter.delete(
	'/:id',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		removeProduct(request, response);
	}
);

export { productRouter };
