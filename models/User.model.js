import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "../config/index.js";

const User = new mongoose.Schema(
  {
    email: { type: String, required: [true, 'email is required'], trim: true },
    username: { type: String, required: [true, 'username is required'], unique: true, trim: true },
    password: { type: String, required: [true, 'password is required'], select: false },
    age: { type: Number, min: 1 },
    isLoggedIn: { type: Boolean, default: false },
    isAccountActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, default: false },
    accessToken: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

User.method('validatePassword', async (password) => {
  if (await bcrypt.compare(password, this.password)) return;
  throw new Error('Wrong credentials');
});

User.method('generateToken', async (payload) => {
  return jwt.sign(
    payload,
    config.JWT_SECRET,
    { 
      issuer: config.Issuer,
      expiresIn: config.ExpiresIn,
    },
  );
});

export const UserModel = mongoose.model('user', User);
