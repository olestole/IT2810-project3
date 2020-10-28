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
    reviews(varenummer: String!): [OutputReview]!
    personalReviews(userEmail: String!): [OutputReview]!
  }

  type Mutation {
    helloWorld(hello: String!): String!
    addReview(review: InputReview!): ReviewResponse!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type ReviewResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!

    user: String!
    title: String!
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

  type OutputReview {
    userEmail: String!
    varenummer: String!
    title: String!
    description: String!
    rating: Int!
  }

  input InputReview {
    userEmail: String!
    varenummer: String!
    title: String!
    description: String!
    rating: Int!
  }
`;
