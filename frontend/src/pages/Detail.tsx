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
  // const [getCountries, { loading, data }] = useLazyQuery(GET_CATS);
  const { data, loading, error } = useQuery(GET_WHITE_WINES);

  if (loading) return <p>Loading ...</p>;
  if (data && data.whiteWines) {
    console.log(data.whiteWines);
  }

  return (
    <div>
      <h1>Detail</h1>
      {data.whiteWines.map((whiteWines: any) => (
        <div>
          <h3>{whiteWines.Varenavn}</h3>
          <h5>Land: {whiteWines.Land}, Distrikt: {whiteWines.Distrikt}</h5>
        </div>
      ))}
    </div>
  );
};

export default Detail;
