import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter, setAddedReview, setCurrentProduct, setSearchText, updateViewMode } from 'store/action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      position: 'relative',
      color: '#DCF2EB',
      marginLeft: theme.spacing(2),
      fontFamily: 'sans-serif',
      [theme.breakpoints.down(650)]: {
        display: 'block',
      },
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    logo: {
      width: 60,
      '& img': {
        width: '100%',
      },
    },
    titleContainer: {
      [theme.breakpoints.down(650)]: {
        display: 'none',
      },
    },
  }),
);

const Logo = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    if (history.location.pathname === '/') {
      dispatch(resetFilter());
      dispatch(updateViewMode({ field: 'initialLoad', value: true }));
      dispatch(setSearchText(''));
    }
    dispatch(setCurrentProduct(null));
    dispatch(setAddedReview(null));
    // If the user's already on the overview-page we don't want to add x amount of overview-history to the historystack.
    if (history.location.pathname !== '/') {
      history.push('/');
    }
  };

  return (
    <div className={classes.logoContainer} onClick={handleBackClick} role="homeButton">
      <div className={classes.logo} role="image">
        <img src="appLogo.svg" />
      </div>
      <div className={classes.titleContainer}>
        <Typography role="title" className={classes.title} align="right" variant="h4" noWrap>
          WineEncyclopedia
        </Typography>
      </div>
    </div>
  );
};

export default Logo;
