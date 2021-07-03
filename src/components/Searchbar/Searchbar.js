import React from 'react';
import { SearchContainer, LogoLink, Searchbox } from './SearchbarStyle';
import chatAppLogo from '@assets/chat-app-logo.png';
import searchIcon from '@assets/search.png';

const Searchbar = () => {
  return (
    <SearchContainer>
      <LogoLink to='/'>
        <img src={chatAppLogo} alt='chat-app-logo' />
      </LogoLink>
      <img src={searchIcon} alt='search-icon' />
      <Searchbox type='text' placeholder='Search...' />
    </SearchContainer>
  );
};

export default Searchbar;
