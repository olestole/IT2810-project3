import React from 'react';
import { DetailView } from 'components/Detail';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setCurrentProduct } from 'store/action';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

import ProductReview from 'components/Detail/ProductReview/ProductReview';
import { Product } from 'types/globalTypes';
import { GET_SINGLE_PRODUCT } from 'graphql/queries';
import { SingleProductQuery } from 'graphql/__generated__/SingleProductQuery';

const Detail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery<SingleProductQuery>(GET_SINGLE_PRODUCT, {
    variables: { number: location.pathname.substr(1) },
  });

  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  if (loading) return <LoadingIndicator />;
  if (error || !data) return <h1>ERROR</h1>;
  if (data && data.singleProduct) {
    dispatch(setCurrentProduct(data.singleProduct as Product));
  }

  return (
    <div>
      <DetailView />
      <ProductReview />
    </div>
  );
};

export default Detail;
