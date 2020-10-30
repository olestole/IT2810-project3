import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    loadingIndicator: {
      display: 'flex',
      height: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export default function LoadingIndicator() {
  const classes = useStyles();

  return (
    <div className={classes.loadingIndicator} role="loading">
      <div className={classes.root}>
        <CircularProgress size="6rem" />
      </div>
    </div>
  );
}
