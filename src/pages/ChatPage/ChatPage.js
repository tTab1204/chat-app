import React from 'react';
import Searchbar from '@components/Searchbar/Searchbar';
import Sidebar from '@components/Sidebar/Sidebar';
import MainPanel from '@components/MainPanel/MainPanel';
import { MainPageContainer, SidebarContainer, MainPanelContainer } from './ChatPageStyle';
const ChatPage = () => {
  return (
    <>
      <header>
        <Searchbar />
      </header>
      <main>
        <MainPageContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <MainPanelContainer>
            <MainPanel />
          </MainPanelContainer>
        </MainPageContainer>
      </main>
    </>
  );
};

export default ChatPage;
