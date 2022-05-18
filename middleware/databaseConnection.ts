import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../config/.env' });

export const connectToDatabase = () => {
	mongoose
		.connect(process.env.MONGODB_URI + '')
		.then(() => console.log('Database connection succesfull'))
		.catch((error: any) => console.log(error.message));
};
