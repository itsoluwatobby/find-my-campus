import { UserModel } from "../models/index.js";

class UserRepository {
  async createUser(user) {
    return UserModel.create(user);
  }

  async findUsers() {
    return UserModel.find();
  }

  async findUser(id, withPassword = false) {
    return UserModel.findById(id).select(withPassword ? '+password' : '');
  }

  async findUserByEmail(email, withPassword = false) {
    return UserModel.findOne({ email }).select(withPassword ? '+password' : '');
  }

  async updateUser(query, updateInfo) {
    return UserModel.findOneAndUpdate(query, updateInfo, { new: true });
  }
}
export const userRepository = new UserRepository();
