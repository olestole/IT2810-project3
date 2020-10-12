import React from 'react';
import './logo.css';
import LogoImage from 'assets/appLogo.png';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      position: 'relative',
      color: 'white',
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
        <img src={LogoImage}></img>
      </div>
      <Typography className={classes.title} align="right" variant="h3" noWrap>
        WineEncyclopedia
      </Typography>
    </div>
  );
};

export default Logo;
