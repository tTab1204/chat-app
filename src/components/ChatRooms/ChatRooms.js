import React, { useEffect, useState } from 'react';
import {
  ChatListContainer,
  ChatLists,
  PlusOutlinedStyle,
  CaretDownOutlinedStyle,
  ChatRoom,
  InputStyle,
  BadgeStyle,
  floatRight,
} from './ChatRoomsStyle';
import { Button, Form, Modal, Input, Badge, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '@/firebase';
import { getCurrentChatRoom, setPrivateChatRoom } from '@/redux/actions/chatRoom_actions';

const ChatRooms = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const chatRoomsRef = firebase.database().ref('chatRooms');
  const messagesRef = firebase.database().ref('messages');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChatRoomId, setActiveChatRoomId] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const [, setChatRoomsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const onChannelNameChange = (e) => {
    setName(e.target.value);
  };

  const onChannelDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = chatRoomsRef.push().key;

    const newChatRoom = {
      id: key,
      name: name,
      description: description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };
    try {
      await chatRoomsRef.child(key).update(newChatRoom);
      setName('');
      setDescription('');
      setIsModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const isVisibleChatList = () => {
    setShowChatList(!showChatList);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectChatRoom = (room) => {
    dispatch(getCurrentChatRoom(room));
    dispatch(setPrivateChatRoom(false));
    setActiveChatRoomId(room.id);
  };

  const setFirstChatRoom = () => {
    const firstChatRoom = chatRooms[0];
    if (firstLoad && chatRooms.length > 0) {
      dispatch(getCurrentChatRoom(firstChatRoom));
      setActiveChatRoomId(firstChatRoom.id);
    }
    setFirstLoad(false);
  };

  const getAllchatRoomsListeners = async () => {
    let chatRoomsArray = [];
    await chatRoomsRef.on('child_added', (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      setChatRooms(chatRoomsArray);
      setFirstChatRoom();
      setChatRoomsLoading(false);

      addNotificationListeners(DataSnapshot.key);
    });
  };

  const addNotificationListeners = (chatRoomId) => {
    messagesRef.child(chatRoomId).on('value', (DataSnapshot) => {
      if (chatRoom) {
        handleNotification(chatRoomId, chatRoom.id, notifications, DataSnapshot);
      }
    });
  };

  // Challenge
  const handleNotification = (chatRoomId, currentChatRoomId, notifications, DataSnapshot) => {
    let index = notifications.findIndex((notification) => notification.id === chatRoomId);
    let lastTotal = 0;

    // 해당 채팅방의 알림 정보가 없을 때
    if (index === -1) {
      notifications.push({
        id: chatRoomId,
        total: DataSnapshot.numChildren(),
        lastKnownTotal: DataSnapshot.numChildren(),
        count: 0,
      });
    }

    // 이미 해당 채팅방의 알림 정보가 있을 때
    else {
      // 상대방이 채팅 보내는 그 해당 채팅방에 있지 않을 때
      if (chatRoomId !== currentChatRoomId) {
        lastTotal = notifications[index].lastKnownTotal;
        console.log('lastTotal: ', lastTotal);

        if (DataSnapshot.numChildren() - lastTotal > 0) {
          notifications[index].count = DataSnapshot.numChildren() - lastTotal;
        }
      }
      notifications[index].total = DataSnapshot.numChildren();
    }
    setNotifications(notifications);
    console.log('notifications: ', notifications);
  };

  // const getNotificationCount = (room) => {
  //   let count = 0;

  //   notifications.forEach((notification) => {
  //     if (notification.id === room.id) {
  //       count = notification.count;
  //       console.log('count: ', count);
  //     }
  //   });
  //   if (count > 0) return count;
  // };

  useEffect(() => {
    if (chatRooms) getAllchatRoomsListeners();
    // challenge 1: clean up function은 언제 써야하는건지 아직도 정확히 모르겠다.
  }, [chatRooms.length, notifications.length]);

  return (
    <div>
      <div>
        <ChatListContainer>
          <CaretDownOutlinedStyle flag={showChatList} onClick={isVisibleChatList} /> Chat Channels
          <PlusOutlinedStyle onClick={showModal} />
        </ChatListContainer>
        {showChatList && (
          <ChatLists>
            {chatRooms?.map((room) => (
              <ChatRoom
                key={room.id}
                flag={room.id === activeChatRoomId}
                onClick={() => selectChatRoom(room)}
              >
                # {room.name}
                <div style={floatRight}>
                  <Badge
                    count={
                      // getNotificationCount(room)
                      5
                    }
                    style={BadgeStyle}
                  ></Badge>
                </div>
              </ChatRoom>
            ))}
          </ChatLists>
        )}

        {/* Modal */}
        <Modal
          theme='dark'
          title='Create a chat channel'
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>Close</Button>,
            <Button disabled={name ? false : true} onClick={handleSubmit} type='primary'>
              Save
            </Button>,
          ]}
        >
          <Form layout='vertical' onSubmit={handleSubmit}>
            <Form.Item label='Channel Name'>
              <InputStyle
                size='large'
                placeholder='Enter your channel name'
                onChange={onChannelNameChange}
              />
              {!name && <p style={{ color: '#e82323' }}>Please Enter Channel Name</p>}
            </Form.Item>
            <Form.Item label='Channel Description'>
              <Input
                size='large'
                placeholder='Enter your channel description'
                onChange={onChannelDescriptionChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ChatRooms;
