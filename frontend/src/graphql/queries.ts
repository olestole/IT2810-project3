import { gql } from '@apollo/client';

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
  query SearchProductsQuery($matchedString: String!) {
    searchProducts(searchSequence: $matchedString) {
      Varenavn
      Varetype
      Varenummer
      Produsent
      Volum
      Pris
    }
  }
`;

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

export { GET_START_PRODUCTS, SEARCH_PRODUCTS, GET_REVIEWS, GET_PERSONAL_REVIEWS, GET_SINGLE_PRODUCT };
