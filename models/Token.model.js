import mongoose from "mongoose";

const Token = new mongoose.Schema(
  {
    email: { type: String, required: [true, 'email is required'], unique: true },
    token: { type: String, required: [true, 'token is required'], trim: true },
    expiresIn: { type: Date, required: [true, 'expiresIn is required'] },
  },
);

Token.method('tokenExpired', function() {
  const currentDate = new Date().getTime();
  if (currentDate > this.expiresIn)
    throw Error('Token expired, Please request for a new one')
});

export const TokenModel = mongoose.model('token', Token);
