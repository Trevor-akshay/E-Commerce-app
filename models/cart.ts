import mongoose from 'mongoose';
const CartSchema = new mongoose.Schema(
	{
		userID: { type: String, required: true, unique: true },
		products: { type: Array, required: true },
	},
	{ timestamps: true }
);

const cartSchemaImp = mongoose.model('cart', CartSchema);
export { cartSchemaImp };
