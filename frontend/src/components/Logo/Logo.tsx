import React from 'react';
import './logo.css';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
  const classes = useStyles();

  const handleHomebuttonClick = () => {
    alert('Homebutton pressed');
    /* Set homepage*/
  };

  return (
    <div className="logoContainer" onClick={handleHomebuttonClick}>
      <div className="logo">
        <img src="appLogo.svg"></img>
      </div>
      <Typography className={classes.title} align="right" variant="h3" noWrap>
        WineEncyclopedia
      </Typography>
    </div>
  );
};

export default Logo;
