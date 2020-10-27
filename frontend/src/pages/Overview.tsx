import React from 'react';
import { ProductListView } from 'components/Overview';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

const Overview = () => {
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  return (
    <div className="container">
      <ProductListView />
    </div>
  );
};

export default Overview;
