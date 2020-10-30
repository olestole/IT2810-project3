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
      {/* // <header className="header"> */}
      <div className={classes.headerContent}>
        {/* <div className="headerContent"> */}
        <Logo />
        <div className={classes.headerActionSection}>
          {/* <div className="headerActionSection"> */}
          <Search />
          <AccountCircleOutlinedIcon
            id="profileIcon"
            style={{ fontSize: 40, color: 'white' }}
            onClick={handleProfileClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
