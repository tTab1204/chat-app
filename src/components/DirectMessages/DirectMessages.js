import React, { useEffect, useState } from 'react';
import {
  DirectMessageContainer,
  CaretDownOutlinedStyle,
  LockFilledStyle,
  DirectMessagesList,
  DirectMessageUser,
} from './DirectMessagesStyle';
import firebase from '@/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentChatRoom, setPrivateChatRoom } from '@redux/actions/chatRoom_actions/';

const DirectMessage = () => {
  const dispatch = useDispatch();
  const usersRef = firebase.database().ref('users');
  const user = useSelector((state) => state.user.currentUser);

  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(true);
  const [activeChatRoom, setActiveChatRoom] = useState('');

  const isVisibleUserList = () => {
    setShowUserList(!showUserList);
  };

  const getChatroomId = (userId) => {
    const currentUserId = user.uid;

    return userId > currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
  };

  const selectUserChatRoom = (userInfo) => {
    // console.log('userInfo: ', userInfo);

    const chatRoomId = getChatroomId(userInfo.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: userInfo.name,
    };

    dispatch(getCurrentChatRoom(chatRoomData));
    dispatch(setPrivateChatRoom(true));
    selectActiveChatRoom(userInfo.uid);
  };

  const selectActiveChatRoom = (userId) => {
    setActiveChatRoom(userId);
  };

  useEffect(() => {
    const addUsersListeners = async (currentUserId) => {
      let usersArray = [];
      await usersRef.on('child_added', (DataSnapshot) => {
        if (currentUserId !== DataSnapshot.key) {
          let userInfo = DataSnapshot.val();
          // console.log('values: ', DataSnapshot.val());
          userInfo['uid'] = DataSnapshot.key; //해당 유저 uid 넣어주기
          userInfo['status'] = 'offline';

          usersArray.push(userInfo);
          setUsers(usersArray);
        }
      });
    };

    if (user) addUsersListeners(user?.uid);
  }, [users.length]);

  console.log('activeChatRoom: ', activeChatRoom);

  return (
    <div>
      <DirectMessageContainer>
        <CaretDownOutlinedStyle flag={showUserList} onClick={isVisibleUserList} /> Direct Messages
        <LockFilledStyle />
      </DirectMessageContainer>
      {showUserList && (
        <DirectMessagesList>
          {users?.map((user) => (
            <DirectMessageUser
              key={user.id}
              flag={user.uid === activeChatRoom}
              onClick={() => selectUserChatRoom(user)}
            >
              # {user.name}
            </DirectMessageUser>
          ))}
        </DirectMessagesList>
      )}
    </div>
  );
};

export default DirectMessage;
