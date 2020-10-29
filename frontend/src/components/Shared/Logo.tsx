import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter, setCurrentProduct, updateFilterDisplay, updateViewMode } from 'store/action';
import './logo.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      position: 'relative',
      color: '#DCF2EB',
      marginLeft: theme.spacing(2),
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
  const dispatch = useDispatch();

  const handleBackClick = () => {
    if (history.location.pathname == '/') {
      dispatch(updateFilterDisplay('startMode'));
      dispatch(resetFilter());
      dispatch(updateViewMode({ field: 'initialLoad', value: true }));
    }
    dispatch(setCurrentProduct(null));
    // If the user's already on the overview-page we don't want to add x amount of overview-history to the historystack.
    if (history.location.pathname != '/') {
      history.push('/');
    }
  };

  return (
    <div className="logoContainer" onClick={handleBackClick}>
      <div className="logo">
        <img src="appLogo.svg"></img>
      </div>
      <div className="title">
        <Typography className={classes.title} align="right" variant="h4" noWrap>
          WineEncyclopedia
        </Typography>
      </div>
    </div>
  );
};

export default Logo;
