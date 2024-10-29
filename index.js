import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './models/schema.js';
import { ConnectDB } from './config/dbConfig.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userRepository, postRepository, tokenRepository } from './repository/index.js';
import { helper } from './utils/helper.js';

ConnectDB();

const resolvers = {
  Query: {
    async user(_, args, auth) {
      console.log(auth)
      return userRepository.findUser(args.id);
      // if (!user) throw new Error('User not found');
    },
    async users() {
      return userRepository.findUsers();
    },
    async token(_, args) {
      return tokenRepository.findTokenByEmail(args.email);
    },
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
    async register(_, args) {
      const { user } = args;
      user.password = await bcrypt.hash(user.password, 10);
      const newUser = await userRepository.createUser(user);
      return newUser;
    },

    async login(_, args) {
      const { credential } = args;

      const user = await userRepository.findUserByEmail(credential.email, true);
      await user.validatePassword(credential.password);
      
      user.generateAccessToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      );
      user.isLoggedIn = true;
      await user.save();

      return user;
    },

    async updateUser(_, args) {
      
    },

    async logout(_, args) {
      const user = await userRepository.findUser(args.id);

      user.isLoggedIn = false;
      user.accessToken = '';
      await user.save();

      return 'Logout successful';
    },
    
    async forgotPassword(_, args) {
      const user = await userRepository.findUserByEmail(args.email, true);
      if (!user) throw new Error('User not found');

      const genToken = helper.generateToken();
      const token = await tokenRepository.createToken({ ...genToken, email: user.email });

      return token;
    },

    async updatePassword(_, args) {

    },

    // # AUTH
    activateAccount(_, args) {

    },

    // # POSTS
    createPost(_, args) {

    },

    async deletePost(_, args) {

    },

    async updatePost(_, args) {

    },
  }
};

const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: true,
  }
);

// DB CONNECTION
mongoose.connection.on('open', async () => {
  const { url } = await startStandaloneServer(server, {
    listen: 4500
  });
  console.info(`Server running at: ${url}`);
});

mongoose.connection.on('error', () => {
  console.warn('Error connecting to Database\nInitiating a retry...');
  Promise.resolve(() => {
    setTimeout(async () => {
      await ConnectDB();
    }, 5000);
  });
})
