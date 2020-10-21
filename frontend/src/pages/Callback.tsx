import LoadingIndicator from 'components/Shared/LoadingIndicator';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from 'store/types';

/**
 * Handles conditional logic after a redirect to another page, e.g after Auth0s login-page
 */
export const Callback = () => {
  const history = useHistory();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);

  useEffect(() => {
    redirectApp();
  }, []);

  const redirectApp = async () => {
    if (currentProduct) return history.push(`/${currentProduct.Varenummer}`);

    const res = sessionStorage.getItem('currentProduct');
    if (res == 'null' || res == 'undefined') return history.push('/');

    const json = await JSON.parse(res!);
    if (!json) return history.push('/');
    const sessionProduct: Product = await JSON.parse(res!);
    history.push(`/${sessionProduct.Varenummer}`);
  };

  return <LoadingIndicator />;
};
