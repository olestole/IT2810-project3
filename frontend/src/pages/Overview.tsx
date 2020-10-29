import React from 'react';
import { ProductListView } from 'components/Overview';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import Sidebar from 'components/Shared/Sidebar';
import { createStyles, makeStyles } from '@material-ui/core';
import './overview.css';

const Overview = () => {
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  return (
    <div className="overview">
      <Sidebar />
      <ProductListView />
    </div>
  );
};

export default Overview;
