import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    cats: [Cat!]!
    age: Int!
    ingredients(ingredient: String): String!
    yo: String!
    products: [Product!]!
  }

  type Product {
    Varenavn: String!
    Volum: String
    Pris: String
  }

  type Cat {
    id: ID!
    name: String!
    color: String
  }

  type Mutation {
    createProduct(Varenavn: String!): Product!
  }
`;
