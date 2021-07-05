import React, { useEffect, useState } from 'react';
import Message from '@components/Message/Message';
import MessageForm from '@components/MessageForm/MessageForm';
import { MainPanelContainer, MessageBox } from './MainPanelStyle';
import { useSelector } from 'react-redux';
import firebase from '@/firebase';

const MainPanel = () => {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const user = useSelector((state) => state.user.currentUser);
  const messagesRef = firebase.database().ref('messages');

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const addMessagesListeners = async (chatRoomId) => {
    let messagesArray = [];
    await messagesRef.child(chatRoomId).on('child_added', (DataSnapshot) => {
      messagesArray.push(DataSnapshot.val());
      setMessages(messagesArray);
      setMessagesLoading(false);
    });
  };

  useEffect(() => {
    if (chatRoom) addMessagesListeners(chatRoom.id);
  }, [chatRoom, messagesLoading]);

  return (
    <MainPanelContainer>
      <MessageBox>
        {messages?.map((message, i) => (
          <Message key={i} message={message} user={user} />
        ))}
      </MessageBox>
      <MessageForm />
    </MainPanelContainer>
  );
};

export default MainPanel;
