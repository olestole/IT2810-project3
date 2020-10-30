import React from 'react';
import { ProductListView } from 'components/Overview';
import Sidebar from 'components/Shared/Sidebar';

const Overview = () => {
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  return (
    <div>
      <Sidebar />
      <ProductListView />
    </div>
  );
};

export default Overview;
