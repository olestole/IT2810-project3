// @ts-ignore
import express from "express";
import { ApolloServer } from "apollo-server-express";
// @ts-ignore
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

// Preload environment variables from .env
require("dotenv").config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  // await mongoose.connect("mongodb://localhost:27017/wineAssortment", {
  await mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
