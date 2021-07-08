import React from 'react';
import Searchbar from '@components/Searchbar/Searchbar';
import Sidebar from '@components/Sidebar/Sidebar';
import MainPanel from '@components/MainPanel/MainPanel';
import { useSelector } from 'react-redux';
import { MainPageContainer, MainPanelContainer } from './ChatPageStyle';

const ChatPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChatRoom = useSelector((state) => state.chatRoom.currentChatRoom);

  return (
    <>
      <header>
        <Searchbar />
      </header>
      <main>
        <MainPageContainer>
          <Sidebar key={currentUser?.uid} />
          <MainPanelContainer>
            <MainPanel key={currentChatRoom?.id} />
          </MainPanelContainer>
        </MainPageContainer>
      </main>
    </>
  );
};

export default ChatPage;
