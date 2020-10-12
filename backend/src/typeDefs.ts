import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    products: [Product!]!
    whiteWines: [Wine!]!
  }

  type Product {
    Varenavn: String!
    Volum: String
    Pris: String
  }

  type Wine {
    Varenavn: String!
    Volum: String
    Pris: String
    Lukt: String
    Smak: String
    Land: String
    Distrikt: String
  }

  type Mutation {
    createProduct(Varenavn: String!): Product!
  }
`;
