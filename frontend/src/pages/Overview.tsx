import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ProductListView } from 'components/Overview';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

const GET_WHITE_WINES = gql`
  query Query {
    whiteWines {
      Varenavn
      Land
      Distrikt
    }
  }
`;

const GET_SINGLE_PRODUCT = gql`
  query Query($number: String!) {
    singleProduct(productNumber: $number) {
      Varenavn
      Varenummer
    }
  }
`;

const Overview = () => {
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  const { data, loading, error } = useQuery(GET_WHITE_WINES);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="container">
      <ProductListView />
    </div>
  );
};

export default Overview;
