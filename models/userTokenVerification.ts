import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userTokenVerificationSchema = new Schema({
	userID: { type: String, required: true, unique: true },
	token: { type: String, required: true, unique: true },
	createdAt: Date,
	expiresAt: Date,
});

const userTokenVerification = mongoose.model(
	'userTokenVerification',
	userTokenVerificationSchema
);

export { userTokenVerification };
