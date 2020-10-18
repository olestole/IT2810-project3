import React from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { makeQuery } from 'utils/client';
import { Link } from 'react-router-dom';
import { ProductListView } from 'components/Overview';

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
  //const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, { variables: { number: "232101"}});

  if (loading) return <p>Loading ...</p>;

  if (data && data.whiteWines) {
    console.log(data.whiteWines);
  }
  /*
  if (data && data.singleProduct) {
    console.log(data.singleProduct);
  }
  */

  return (
    <div>
      <div className="container">
        <ProductListView />
      </div>
      {/* {data.whiteWines.map((whiteWines: any) => (
        <Link to={'/123'}>
          <div id={whiteWines.Varenavn} onClick={() => console.log('HALLA')}>
            <h3>{whiteWines.Varenavn}</h3>
            <h5>
              Land: {whiteWines.Land}, Distrikt: {whiteWines.Distrikt}
            </h5>
          </div>
        </Link>
      ))} */}
    </div>
  );
};

export default Overview;
