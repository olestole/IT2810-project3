import LoadingIndicator from 'components/Shared/LoadingIndicator';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from 'types/globalTypes';

/**
 * Handles conditional logic after a redirect to another page, e.g after Auth0s login-page
 */
export const Callback = () => {
  const history = useHistory();

  const redirectApp = async () => {
    // For some unknown reason the redirect needs some time to register the authentication has taken place
    setTimeout(async () => {
      // Display a toast to let the user know if the login/logout was successful
      const loggedIn = await JSON.parse(sessionStorage.getItem('loggedIn')!);
      loggedIn ? toast.info('Vellykket innlogging 🦄') : toast.info('Vellykket utlogging 🦄');

      const res = sessionStorage.getItem('currentProduct');
      if (res === 'null' || res === 'undefined') return history.push('/profile');

      const json = await JSON.parse(res!);
      if (!json) return history.push('/');

      const sessionProduct: Product = await JSON.parse(res!);
      console.log(sessionProduct.Varenummer);

      history.push(`/${sessionProduct.Varenummer}`);
      // history.push(`/profile`);
    }, 1000);
  };

  useEffect(() => {
    redirectApp();
  }, [redirectApp]);

  return <LoadingIndicator />;
};
