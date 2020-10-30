import React from 'react';
import { Logo } from 'components/Shared';
import { Search } from 'components/Shared';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      background: 'var(--primary)',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1,
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1em',
    },
    headerActionSection: {
      display: 'flex',
      alignItems: 'center',
    },
    profileIcon: {
      fontSize: 40,
      color: 'white',
    },
    profileIconContainer: {
      '& :hover': {
        cursor: 'pointer',
      },
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerContent}>
        <Logo />
        <div className={classes.headerActionSection}>
          <Search />
          <div className={classes.profileIconContainer}>
            <AccountCircleOutlinedIcon id="profileIcon" onClick={handleProfileClick} className={classes.profileIcon} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
