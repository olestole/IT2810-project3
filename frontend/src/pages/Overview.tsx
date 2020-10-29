import React from 'react';
import { ProductListView } from 'components/Overview';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import Sidebar from 'components/Shared/Sidebar';
import { createStyles, makeStyles } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

const Overview = () => {
  const { user } = useAuth0();

  console.log('USER:', user);

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
