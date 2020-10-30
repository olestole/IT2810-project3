import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    products(
      searchSequence: String!
      varetyper: [String]!
      prisgt: Float!
      prisls: Float!
      volumgt: Float!
      volumls: Float!
      index: Int!
    ): [Product!]!
    singleProduct(productNumber: String!): Product
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

    userEmail: String!
    title: String!
    varenummer: String!
    description: String!
    rating: Int!
  }

  type Product {
    Varenavn: String!
    Varenummer: String
    Varetype: String
    Volum: Float
    Pris: Float
    Produsent: String
    Land: String
    Farge: String
    Lukt: String
    Smak: String
  }

  type Wine {
    Varenavn: String!
    Volum: Float
    Pris: Float
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
