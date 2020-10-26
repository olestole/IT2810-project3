import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    products: [Product!]!
    whiteWines: [Wine!]!
    singleProduct(productNumber: String!): Product
    startProducts(startIndex: Int!): [Product!]!
    searchProducts(searchSequence: String!, index: Int!): [Product!]!
    filterProducts(
      varetyper: [String]!
      prisgt: Float!
      prisls: Float!
      volumgt: Float!
      volumls: Float!
      index: Int!
    ): [Product!]!
    typeProduct(type: String!): [Product]
    nameProduct(name: String!): [Product]
  }

  type Product {
    Varenavn: String!
    Varenummer: String
    Varetype: String
    Volum: String
    Pris: String
    Produsent: String
    Land: String
    Farge: String
    Lukt: String
    Smak: String
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
