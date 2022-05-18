import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './middleware/databaseConnection';
import { userRouter } from './routes/user';
import { productRouter } from './routes/product';
import { cartRouter } from './routes/cart';
import { orderRouter } from './routes/order';
import { stripeRouter } from './routes/stripe';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

connectToDatabase();

const app = express();
app.use(express.json());
app.use('/users/', userRouter);
app.use('/product/', productRouter);
app.use('/cart/', cartRouter);
app.use('/order/', orderRouter);
app.use('/pay/', stripeRouter);

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
	console.log(`Backend server started @ ${process.env.PORT}`);
});
