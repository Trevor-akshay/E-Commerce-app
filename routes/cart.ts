import express from 'express';
import { verifyToken, verifyAuthorization } from '../middleware/auth';
import {
	createCart,
	getCart,
	getCarts,
	updateCart,
	deleteCart,
} from '../controller/cart';
const cartRouter = express.Router();

cartRouter.post(
	'/',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		createCart(request, response);
	}
);

cartRouter.get(
	'/',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		getCarts(request, response);
	}
);

cartRouter.get(
	'/:userID',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		getCart(request, response);
	}
);

cartRouter.put(
	'/:id',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		updateCart(request, response);
	}
);

cartRouter.delete(
	'/:id',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		deleteCart(request, response);
	}
);
export { cartRouter };
