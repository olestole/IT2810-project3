import React from 'react';
import './header.css';
import { Logo } from 'components/Shared';
import { Search } from 'components/Shared';
import { Icon } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const handleProfileClick = () => {
    history.push('/login');
  };

  return (
    <header className="header">
      <Logo />
      <Search />
      <AccountCircleOutlinedIcon style={{ fontSize: 40, color: 'white' }} onClick={handleProfileClick} />
    </header>
  );
};

export default Header;
