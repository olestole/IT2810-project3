import React from 'react';
import './logo.css';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      position: 'relative',
      color: '#DCF2EB',
      margin: theme.spacing(2),
      fontFamily: 'sans-serif',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
);

const Logo = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleHomebuttonClick = () => {
    // If the user's already on the overview-page we don't want to add x amount of overview-history to the historystack.
    if (history.location.pathname != '/') {
      history.push('/');
    }
  };

  return (
    <div className="logoContainer" onClick={handleHomebuttonClick}>
      <div className="logo">
        <img src="appLogo.svg"></img>
      </div>
      <div className="title">
        <Typography className={classes.title} align="right" variant="h3" noWrap>
          WineEncyclopedia
        </Typography>
      </div>
    </div>
  );
};

export default Logo;
