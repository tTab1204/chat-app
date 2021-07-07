import React from 'react';
import UserPanel from '@components/UserPanel/UserPanel.js';
import Favorited from '@components/Favorited/Favorited';
import ChatRooms from '@components/ChatRooms/ChatRooms';
import DirectMessages from '@components/DirectMessages/DirectMessages';
import { SidebarContainer, SidebarWrapper, SidebarBox } from './SidebarStyle';
import { useSelector } from 'react-redux';

const Sidebar = ({ showSidebar }) => {
  const showMenu = useSelector((state) => state.menu.showMenu);

  return (
    <SidebarContainer flag={showMenu} showSidebar={showSidebar}>
      <SidebarWrapper>
        <SidebarBox>
          <UserPanel />
          <Favorited />
          <ChatRooms />
          <DirectMessages />
        </SidebarBox>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
