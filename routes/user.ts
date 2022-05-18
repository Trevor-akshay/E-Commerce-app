import express from 'express';

import {
	createUser,
	loginUser,
	getUsers,
	getUserByEmail,
	updateUser,
	deleteUser,
} from '../controller/user';
import { verifyToken } from '../middleware/auth';

const userRouter = express.Router();
userRouter.post('/register', (request, response) => {
	createUser(request, response);
});

userRouter.post('/login', verifyToken, (request, response) => {
	loginUser(request, response);
});

userRouter.get(
	'/',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		getUsers(request, response);
	}
);

userRouter.get(
	'/:email',
	verifyToken,
	(request: express.Request, response: express.Response) => {
		getUserByEmail(request, response);
	}
);

userRouter.put('/:email', verifyToken, (request: express.Request, response) => {
	updateUser(request, response);
});

userRouter.delete(
	'/:email',
	verifyToken,
	(request: express.Request, response) => {
		deleteUser(request, response);
	}
);

export { userRouter };
