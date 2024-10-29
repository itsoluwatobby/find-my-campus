import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'userId is required'],
      ref: 'users',
    },
    title: { type: String, required: [true, 'title is required'], trim: true },
    content: { type: String, required: [true, 'content is required'] },
  },
  {
    timestamps: true,
  }
);

// EarningHistorySchema.plugin(mongoosePaginate);
export const PostModel = mongoose.model('post', Post);
