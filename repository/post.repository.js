import { PostModel } from "../models/index.js";

class PostRepository {
  async createPost(post) {
    return PostModel.create(post);
  }

  async findPost(id) {
    return PostModel.findById(id);
  }
  
  async findPosts() {
    // const posts = await PostModel.paginate(
    //   {},
    //   { page: pageNumber ?? 1, limit: limit ?? 5 },
    // );
    return PostModel.find();
  }
  
  async findUserPosts(userId) {
    // const posts = await PostModel.paginate(
    //   {},
    //   { page: pageNumber ?? 1, limit: limit ?? 5 },
    // );
    return PostModel.find({ userId });
  }

  async updatePost(query, updateInfo) {
    return PostModel.findOneAndUpdate(query, updateInfo, { new: true });
  }
}
export const postRepository = new PostRepository();
