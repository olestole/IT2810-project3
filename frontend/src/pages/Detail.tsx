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

/*
const LOGIN_USER = gql`
  mutation CreateCatMutation($createCatName: String!) {
    createCat(name: $createCatName) {
      name
    }
  }
`;
*/

const Detail = () => {
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  const { data, loading, error } = useQuery(GET_WHITE_WINES);
  //const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, { variables: { number: "232101"}});

  
  /*
  if (data && data.singleProduct) {
    console.log(data.singleProduct);
  }
  */

  return (
    <div>
      <h1>Detail</h1>
      {data.whiteWines.map((whiteWines: any) => (
        <div id={whiteWines.Varenavn}>
          <h3>{whiteWines.Varenavn}</h3>
          <h5>Land: {whiteWines.Land}, Distrikt: {whiteWines.Distrikt}</h5>
        </div>
      ))}
      {/*
      <h2>{data.singleProduct[0].Varenavn}</h2>
      */}
    </div>
  );
};

export default Detail;
