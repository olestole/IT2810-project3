import React from 'react';
import { DetailView } from 'components/Detail';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setCurrentProduct } from 'store/action';
import { AppState } from 'store/types';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

import { useAuth0 } from '@auth0/auth0-react';
import ProductReview from 'components/Detail/ProductReview/ProductReview';
import { Product } from 'types/globalTypes';
import { ReviewList } from 'components/Shared';

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
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, { variables: { number: location.pathname.substr(1) } });

  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  if (loading) return <LoadingIndicator />;
  if (error) return <h1>ERROR</h1>;
  if (data && data.singleProduct) {
    dispatch(setCurrentProduct(data.singleProduct as Product));
  }

  return data ? (
    <div>
      <DetailView />
      <ProductReview />
    </div>
  ) : (
    <h1>Noe feil har skjedd</h1>
  );
};

export default Detail;
