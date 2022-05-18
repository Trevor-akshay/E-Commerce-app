import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true, unique: true },
		image: { type: String },
		category: { type: Array, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);
const productSchemaImp = mongoose.model('product', ProductSchema);
export { productSchemaImp };
