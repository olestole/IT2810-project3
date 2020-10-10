import React from 'react';
import './header.css';
import Logo from 'assets/appLogo.png';
import { InputBase, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.9),
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
      margin: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  const handleHomebuttonClick = () => {
    alert('Homebutton pressed');
    /* Set homepage*/
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      alert('Enter pressed');
      /*Search function */
    }
  };

  return (
    <header className="header">
      <div className="logoContainer" onClick={handleHomebuttonClick}>
        <div className="logo">
          <img src={Logo}></img>
        </div>
        <Typography className={classes.title} align="right" variant="h3" noWrap>
          WineEncyclopedia
        </Typography>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Søk…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </header>
  );
};

export default Header;
