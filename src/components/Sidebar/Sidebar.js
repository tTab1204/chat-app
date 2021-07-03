import React, { useState } from 'react';
import UserPanel from '@components/UserPanel/UserPanel.js';
import Favorited from '@components/Favorited/Favorited';
import ChatRooms from '@components/ChatRooms/ChatRooms';
import DirectMessages from '@components/DirectMessages/DirectMessages';
import { SidebarContainer, SidebarWrapper } from './SidebarStyle';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <UserPanel />
        <Favorited />
        <ChatRooms />
        <DirectMessages />
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
