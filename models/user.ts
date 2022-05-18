import mongoose from 'mongoose';
import speakeasy from 'speakeasy';

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		verified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const userSchemaImp = mongoose.model('user', UserSchema);
export { userSchemaImp };
