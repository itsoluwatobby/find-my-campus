import { authenticationResolver } from './auth.resolver.js';
import { campusResolver } from './campus.resolver.js';
import { userResolver } from './user.resolver.js';

export const resolvers = {
  Query: {
    user: userResolver.user,
    
    users: userResolver.users,

    async post(_, args) {
      return postRepository.findPost(args.id);
    },
    async posts() {
      return postRepository.findPosts();
    },
  },

  User: {
    async posts(parent) {
      return postRepository.findUserPosts(parent.id);
    }
  },

  Mutation: {
    register: authenticationResolver.register,

    login: authenticationResolver.login,

    updateUser: userResolver.updateUser,

    logout: authenticationResolver.logout,

    updatePassword: authenticationResolver.updatePassword,

    // # AUTH
    activateAccount: authenticationResolver.activateAccount,

    // # POSTS
    async createPost(_, args) {

    },

    async deletePost(_, args) {

    },

    async updatePost(_, args) {

    },
  }
};
