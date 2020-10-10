import React from 'react';
import './header.css';
import { Logo } from 'components/Logo';
import { Search } from 'components/Search';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Search />
    </header>
  );
};

export default Header;
