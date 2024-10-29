import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'title is required'], trim: true },
    content: { type: String, required: [true, 'content is required'] },
  },
  {
    timestamps: true,
  }
);
export const PostModel = mongoose.model('post', Post);
