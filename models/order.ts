import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema(
	{
		userID: { type: String, required: true, unique: true },
		products: { type: Array, required: true },
		amount: { type: Number, required: true },
		address: { type: String, required: true },
		status: { type: String, default: 'Order Confirmation pending' },
	},
	{ timestamps: true }
);
const orderSchemaImp = mongoose.model('order', OrderSchema);
export { orderSchemaImp };
