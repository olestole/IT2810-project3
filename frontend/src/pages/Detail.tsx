import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { DetailView } from 'components/Detail';

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

const Detail = () => {
  const [id, setId] = useState('string');

  useEffect(() => {
    setId(window.location.pathname.slice(1));
  }, []);

  console.log(id);

  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, { variables: { number: id } });
  console.log(data);
  if (loading) return <p>Loading ...</p>;

  /*if (error) return console.log(error);*/

  return (
    <div>
      <DetailView product={data.singleProduct[0]} />
    </div>
  );
};

export default Detail;
