import React from 'react';
import { Logo } from 'components/Shared';
import { Search } from 'components/Shared';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useHistory } from 'react-router-dom';
import './header.css';

const Header = () => {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/login');
  };

  return (
    <header className="header">
      <div className="headerContent">
        <Logo />
        <div className="headerActionSection">
          <Search />
          <AccountCircleOutlinedIcon style={{ fontSize: 40, color: 'white' }} onClick={handleProfileClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
