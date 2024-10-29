import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './models/schema.js';
import { ConnectDB } from './config/dbConfig.js';
import mongoose from 'mongoose';

ConnectDB();

const resolvers = {
  Query: {
    user(_, args) {
      return 
    }
  },
  Mutation: {

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
