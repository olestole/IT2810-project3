import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { decrement, increment } from 'store/action';
import { AppState } from 'store/types';
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
      Varenummer
    }
  }
`;

const Detail = () => {
  const location = useLocation();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, { variables: { number: location.pathname.substr(1) } });

  // REDUX BELOW
  const dispatch = useDispatch();
  const count: number = useSelector((state: AppState) => state.count);

  const dispatchIncrement = (e: any) => {
    e.preventDefault();
    dispatch(increment());
  };
  const dispatchDecrement = (e: any) => {
    e.preventDefault();
    dispatch(decrement());
  };
  // REDUX ABOVE

  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  if (loading) return <p>Loading ...</p>;

  if (data && data.singleProduct) {
    console.log(data.singleProduct);
  }

  return (
    <div>
      <h1>Detail</h1>
      <h1>Count: {count}</h1>
      <button onClick={dispatchIncrement}>INCREMENT</button>
      <button onClick={dispatchDecrement}>DECREMENT</button>
      <h3>{data.singleProduct.Varenavn}</h3>
      <h3>{data.singleProduct.Varetype}</h3>
    </div>
  );
};

export default Detail;

