import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';

const GET_PRODUCTS = gql`
  query Query {
    products {
      Varenavn
      Varetype
      Produsent
      Volum
      Pris
    }
  }
`;

const TemporaryPLW = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  console.log(data)

  if (loading) return <p>Loading ...</p>;
  if (data && data.products) {
    console.log(data.products);
  }

  return (
    <div>
      <h1>Products</h1>
      {data.products.map((product: any) => (
        <div id={product.Varenavn}>
          <h3>{product.Varenavn}</h3>
          <h5>Varetype: {product.Varetype}, Produsent: {product.Produsent}, Volum: {product.Volum}, Pris: {product.Pris}</h5>
        </div>
      ))}
    </div>
  );
};

export default TemporaryPLW;