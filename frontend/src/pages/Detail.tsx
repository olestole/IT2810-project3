import React from 'react';
import { DetailView } from 'components/Detail';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { decrement, increment } from 'store/action';
import { AppState } from 'store/types';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

import { useAuth0 } from '@auth0/auth0-react';

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
  const { isAuthenticated, user } = useAuth0();

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
  if (loading)
    return (
      <div className="loadingIndicator">
        <LoadingIndicator />
      </div>
    );

  if (error) return <h1>ERROR</h1>;
  if (isAuthenticated) {
    console.log(user);
  }

  return isAuthenticated && data ? (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={dispatchIncrement}>INCREMENT</button>
      <button onClick={dispatchDecrement}>DECREMENT</button>
      <DetailView product={data.singleProduct} />
    </div>
  ) : (
    <h1>nei</h1>
  );
};

export default Detail;
