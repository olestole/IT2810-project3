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

const GET_START_PRODUCTS = gql`
  query StartProductsQuery($index: Int!) {
    startProducts(startIndex: $index) {
      Varenavn
      Varenummer
      Varetype
      Varenummer
      Produsent
      Volum
      Pris
    }
  }
`;

const SEARCH_PRODUCTS = gql`
  query SearchProductsQuery($matchedString: String!, $searchIndex: Int!) {
    searchProducts(searchSequence: $matchedString, index: $searchIndex) {
      Varenavn
      Varetype
      Varenummer
      Produsent
      Volum
      Pris
    }
  }
`;

const FILTER_PRODUCTS = gql`
  query FilterProductsQuery(
    $typer: [String]!
    $prisgt: Float!
    $prisls: Float!
    $volumgt: Float!
    $volumls: Float!
    $filterIndex: Int!
  ) {
    filterProducts(
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

export { GET_START_PRODUCTS, SEARCH_PRODUCTS, GET_REVIEWS, GET_PERSONAL_REVIEWS, GET_SINGLE_PRODUCT, FILTER_PRODUCTS };
// export { GET_REVIEWS, GET_PERSONAL_REVIEWS, GET_SINGLE_PRODUCT };
