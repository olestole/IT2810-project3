import { gql } from '@apollo/client';

const GET_REVIEWS = gql`
  query GetReviewsQuery($reviewsVarenummer: String!) {
    reviews(varenummer: $reviewsVarenummer) {
      userEmail
      varenummer
      title
      description
      rating
    }
  }
`;

const GET_PERSONAL_REVIEWS = gql`
  query GetPersonalReviewsQuery($personalReviewUserEmail: String!) {
    personalReviews(userEmail: $personalReviewUserEmail) {
      userEmail
      varenummer
      title
      description
      rating
    }
  }
`;

const GET_SINGLE_PRODUCT = gql`
  query SingleProductQuery($number: String!) {
    singleProduct(productNumber: $number) {
      Varenummer
      Varenavn
      Volum
      Pris
      Varetype
      Farge
      Lukt
      Smak
      Land
      Produsent
    }
  }
`;

const PRODUCTS = gql`
  query ProductsQuery(
    $matchedString: String!
    $typer: [String]!
    $prisgt: Float!
    $prisls: Float!
    $volumgt: Float!
    $volumls: Float!
    $filterIndex: Int!
  ) {
    products(
      searchSequence: $matchedString
      varetyper: $typer
      prisgt: $prisgt
      prisls: $prisls
      volumgt: $volumgt
      volumls: $volumls
      index: $filterIndex
    ) {
      Varenavn
      Varetype
      Varenummer
      Produsent
      Volum
      Pris
    }
  }
`;

export { GET_REVIEWS, GET_PERSONAL_REVIEWS, GET_SINGLE_PRODUCT, PRODUCTS };
