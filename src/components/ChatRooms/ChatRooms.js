import React, { useEffect, useState } from 'react';
import {
  ChatListContainer,
  ChatLists,
  PlusOutlinedStyle,
  CaretDownOutlinedStyle,
  ChatRoom,
  InputStyle,
} from './ChatRommsStyle';
import { Button, Form, Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '@/firebase';
import { getCurrentChatRoom } from '@/redux/actions/chatRoom_actions';

const ChatRooms = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const chatRoomsRef = firebase.database().ref('chatRooms');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChatRoomId, setActiveChatRoomId] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const [chatRoomsLoading, setChatRoomsLoading] = useState(true);

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

  const getAllchatRooms = async () => {
    let chatRoomsArray = [];
    await chatRoomsRef.on('child_added', (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      setChatRooms(chatRoomsArray);
      setFirstChatRoom();
      setChatRoomsLoading(false);
    });
  };

  useEffect(() => {
    if (chatRooms) getAllchatRooms();
    // challenge 1: clean up function은 언제 써야하는건지 아직도 정확히 모르겠다.
  }, [chatRooms.length]);

  return (
    <div>
      <div>
        <ChatListContainer>
          <CaretDownOutlinedStyle showchatlist={showChatList} onClick={isVisibleChatList} /> Chat
          Channels (1)
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
