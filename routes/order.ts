import express from 'express';
import { verifyToken, verifyAuthorization } from '../middleware/auth';
import {
	createOrder,
	getOrder,
	getOrders,
	updateOrder,
	removeOrder,
} from '../controller/order';
const orderRouter = express.Router();

orderRouter.post(
	'/',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		createOrder(request, response);
	}
);

orderRouter.get(
	'/',
	verifyToken,
	verifyAuthorization,
	(request: express.Request, response: express.Response) => {
		getOrders(request, response);
	}
);

orderRouter.get(
	'/:userID',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		getOrder(request, response);
	}
);

orderRouter.put(
	'/:id',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		updateOrder(request, response);
	}
);

orderRouter.delete(
	'/:id',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		removeOrder(request, response);
	}
);
export { orderRouter };
