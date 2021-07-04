import React from 'react';
import MessageHeader from '@components/MessageHeader/MessageHeader';
import Message from '@components/Message/Message';
import MessageForm from '@components/MessageForm/MessageForm';
import { MainPanelContainer, MessageBox } from './MainPanelStyle';

const MainPanel = () => {
  return (
    <MainPanelContainer>
      <MessageBox></MessageBox>
      <MessageForm />
    </MainPanelContainer>
  );
};

export default MainPanel;
