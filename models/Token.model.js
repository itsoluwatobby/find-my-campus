import mongoose from "mongoose";
import { TokenContext } from "../utils/index.js";

const Token = new mongoose.Schema(
  {
    email: { type: String, required: [true, 'email is required'], unique: true },
    token: { type: String, required: [true, 'token is required'], trim: true },
    expiresIn: { type: Date, required: [true, 'expiresIn is required'] },
    context: {
      type: String,
      required: [true, 'context is required'],
      enum: Object.values(TokenContext),
    },
  },
);

Token.method('isTokenExpired', function() {
  const currentDate = new Date().getTime();
  if (currentDate > this.expiresIn)
    throw Error('Token expired, Please request for a new one')
});

Token.method('verifyToken', function(token, context) {
  if (this.token !== token || this.context !== context)
    throw Error('Invalid token');
  return true;
});

export const TokenModel = mongoose.model('token', Token);
