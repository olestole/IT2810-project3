import { gql } from '@apollo/client';

const GET_START_PRODUCTS = gql`
  query Query($index: Int!) {
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
  query Query($matchedString: String!) {
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

export { GET_START_PRODUCTS, SEARCH_PRODUCTS };
