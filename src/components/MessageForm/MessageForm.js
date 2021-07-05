import React, { useState } from 'react';
import { Form, Progress } from 'antd';
import { TextAreaBox, ImageUploadBox, SendButtonBox } from './MessageFormStyle';
import { PlusCircleFilled, SendOutlined } from '@ant-design/icons';
import firebase from '@/firebase';
import { useSelector } from 'react-redux';

const MessageForm = () => {
  const user = useSelector((state) => state.user.currentUser);
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const messagesRef = firebase.database().ref('messages');

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const createMessage = (fileUrl = null) => {
    const message = {
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };

    if (fileUrl !== null) message['image'] = fileUrl;
    else message['content'] = content;

    return message;
  };

  const handleSubmit = async () => {
    if (!content) {
      setErrors((pre) => pre.concat('Type contents first'));
      return;
    }
    setLoading(true);

    try {
      await messagesRef.child(chatRoom.id).push().set(createMessage());
      setLoading(false);
      setContent('');
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  const onKeydownChat = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  return (
    <div>
      <Form style={{ display: 'flex' }} onSubmit={handleSubmit}>
        <ImageUploadBox>
          <PlusCircleFilled />
        </ImageUploadBox>
        <TextAreaBox
          placeholder='# First Channel - Send message..'
          autoSize={{ minRows: 1, maxRows: 6 }}
          value={content}
          onChange={handleChange}
          onKeyPress={onKeydownChat}
        />
        <SendButtonBox>
          <SendOutlined onClick={handleSubmit} style={{ color: '#058569' }} />
        </SendButtonBox>
      </Form>
      <Progress percent={30} strokeColor='#058569' size='small' />

      <div>
        {errors.map((errorMsg, i) => (
          <p style={{ color: '#e82323' }} key={i}>
            {errorMsg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MessageForm;
