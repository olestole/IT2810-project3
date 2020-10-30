import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { verifyToken } from "./utils/verifyToken";

// Preload environment variables from .env
require("dotenv").config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, ...rest }) => {
      let isAuthenticated = false;
      let user = null;
      try {
        // The request from the client will have a authorization header which looks like the following:
        // "authorization: Bearer asdflkajsdflkajsdføasdkljf"
        const authHeader = req.headers.authorization || "";
        if (authHeader) {
          // Split out the 'Bearer' from the authorization header
          const token = authHeader.split(" ")[1];
          // The verifyToken will throw an error if it fails
          const payload: any = await verifyToken(token);
          isAuthenticated = payload && payload.sub ? true : false;
        }
      } catch (error) {
        console.log(error);
      }
      return { ...rest, req, auth: { user, isAuthenticated } };
    },
  });

  server.applyMiddleware({ app });

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
