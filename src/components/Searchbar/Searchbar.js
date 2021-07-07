import React, { useEffect, useState } from 'react';
import {
  SearchContainer,
  LogoLink,
  Searchbox,
  ChannelName,
  MenuBox,
  SearchWrapper,
} from './SearchbarStyle';
import chatAppLogo from '@assets/chat-app-logo.png';
import searchIcon from '@assets/search.png';
import { useDispatch, useSelector } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import { showFilteredMessages } from '@redux/actions/messages_actions';
import { isVisibleMenu } from '@redux/actions/menu_actions';

const Searchbar = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.chatRoom.currentChatRoom);
  const messages = useSelector((state) => state.messages.messages);

  const [, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(messages);
  const [showMenu, setShowMenu] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const matchValue = messages.filter((message) => message.content?.includes(e.target.value));
    setSearchResults(matchValue);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);

    dispatch(isVisibleMenu(showMenu));
  };
  useEffect(() => {
    dispatch(showFilteredMessages(searchResults));
  }, [searchResults, dispatch]);

  return (
    <SearchContainer>
      <SearchWrapper>
        <MenuBox>
          <MenuOutlined onClick={handleMenuClick} />
        </MenuBox>
        <LogoLink to='/'>
          <img src={chatAppLogo} alt='chat-app-logo' />
        </LogoLink>
        <ChannelName># {currentChannel?.name}</ChannelName>
        <img src={searchIcon} alt='search-icon' />
        <Searchbox type='text' onChange={handleSearchChange} placeholder='Search...' />
      </SearchWrapper>
    </SearchContainer>
  );
};

export default Searchbar;
