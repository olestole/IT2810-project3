import React from 'react';
import { ProductListView } from 'components/Overview';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import Sidebar from 'components/Shared/Sidebar';
import './overview.css';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

const Overview = () => {
  const classes = useStyles();
  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  return (
    <div className={classes.container}>
      <Sidebar />
      <ProductListView />
    </div>
  );
};

export default Overview;
