import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { makeQuery } from 'utils/client';

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
    }
  }
`;

const Detail = () => {
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  // const { data, loading, error } = useQuery(GET_WHITE_WINES);

  // if (loading) return <p>Loading ...</p>;

  // if (data && data.whiteWines) {
  //   console.log(data.whiteWines);
  // }

  return (
    <div>
      <h1>Detail</h1>
    </div>
  );
};

export default Detail;
