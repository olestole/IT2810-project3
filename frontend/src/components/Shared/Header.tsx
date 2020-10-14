import React from 'react';
import './header.css';
import { Logo } from 'components/Shared';
import { Search } from 'components/Shared';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Search />
    </header>
  );
};

export default Header;
