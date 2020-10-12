import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { makeQuery } from 'utils/client';

const GET_CATS = gql`
  query Query {
    cats {
      name
      id
    }
  }
`;

const LOGIN_USER = gql`
  mutation CreateCatMutation($createCatName: String!) {
    createCat(name: $createCatName) {
      name
    }
  }
`;

const Detail = () => {
  // const [getCountries, { loading, data }] = useLazyQuery(GET_CATS);
  const { data, loading, error } = useQuery(GET_CATS);

  if (loading) return <p>Loading ...</p>;
  if (data && data.cats) {
    console.log(data.cats);
  }

  return (
    <div>
      <h1>Detail</h1>
      {/* <button onClick={fetchInfo}>Hent info</button> */}
      {/* <input placeholder="Kattenavn..." />
      <button onClick={() => getCountries()}>Click me to print all countries!</button>
      {data && data.cats && data.cats.map((c: any, i: any) => <div key={i}>{c.name}</div>)} */}
      {data.cats.map((cat: any) => (
        <h3 key={cat.id}>{cat.name}</h3>
      ))}
    </div>
  );
};

export default Detail;
