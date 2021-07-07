import React, { useEffect, useState } from 'react';
import Message from '@components/Message/Message';
import MessageForm from '@components/MessageForm/MessageForm';
import { MainPanelContainer, MessageBox } from './MainPanelStyle';
import { useDispatch, useSelector } from 'react-redux';
import { showMessages } from '@redux/actions/messages_actions';
import { Switch, Route } from 'react-router-dom';
import firebase from '@/firebase';
import DirectMessages from '@components/DirectMessages/DirectMessages';

const MainPanel = () => {
  const dispatch = useDispatch();
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const user = useSelector((state) => state.user.currentUser);
  const filteredMessages = useSelector((state) => state.messages.filteredMessages);
  const messagesRef = firebase.database().ref('messages');

  const [messages, setMessages] = useState([]);
  const [, setMessagesLoading] = useState(true);

  const addMessagesListeners = async (chatRoomId) => {
    let messagesArray = [];
    await messagesRef.child(chatRoomId).on('child_added', (DataSnapshot) => {
      // console.log(DataSnapshot.val());
      messagesArray.push(DataSnapshot.val());
      setMessages(messagesArray);
      setMessagesLoading(false);
    });
  };

  useEffect(() => {
    if (chatRoom) {
      addMessagesListeners(chatRoom.id);
      dispatch(showMessages(messages, chatRoom.name));
    }

    // return () => console.log('component unmounting');
  }, [messages.length]);

  return (
    <MainPanelContainer>
      <MessageBox>
        {!filteredMessages &&
          messages?.map((message) => <Message key={message.id} message={message} user={user} />)}

        {filteredMessages?.map((filteredMessage, i) => (
          <Message key={i} message={filteredMessage} user={user} />
        ))}
      </MessageBox>
      <MessageForm />
    </MainPanelContainer>
  );
};

export default MainPanel;
