import { gql } from '@apollo/client';

export const GET_START_PRODUCTS = gql`
  query Query($index: Int!) {
    startProducts(startIndex: $index) {
      Varenavn
      Varetype
      Varenummer
      Produsent
      Volum
      Pris
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query Query($matchedString: String!, $searchIndex: Int!) {
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

export const FILTER_PRODUCTS = gql`
  query Query(
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

export const PRODUCTS = gql`
  query Query(
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
