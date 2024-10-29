import mongoose from "mongoose";

const Token = new mongoose.Schema(
  {
    email: { type: String, required: [true, 'email is required'], trim: true },
    token: { type: String, required: [true, 'token is required'], trim: true },
    expiresIn: { type: Date, required: [true, 'expiresIn is required'] },
  },
);

export const TokenModel = mongoose.model('token', Token);
