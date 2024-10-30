import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { config } from './config/index.js';
import { typeDefs } from './models/index.js';
import { ConnectDB } from './config/dbConfig.js';
import { CorsOption } from './config/corsOption.js';
import { ContextMiddleware } from './middleware/index.js';
import { resolvers } from './resolvers/index.js';

ConnectDB();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    // includeStacktraceInErrorResponses: true,
  }
);
await server.start();

app.use(
  '/',
  cors(CorsOption),
  express.json(),
  helmet(),
  morgan('common'),
  expressMiddleware(
    server,
    {
      context: ContextMiddleware,
    },
  ),
)

await new Promise((resolve) => {
  httpServer.listen(config.PORT, resolve)
  console.info(`Server running at: ${config.PORT}`)
});

mongoose.connection.on('error', async () => {
  console.warn('Error connecting to Database\nInitiating a retry...');
  await Promise.resolve(() => {
    setTimeout(async () => {
      await ConnectDB();
    }, 5000);
  });
})
