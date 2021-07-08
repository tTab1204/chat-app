import React, { useRef, useState } from 'react';
import { Form, Progress } from 'antd';
import {
  TextAreaBox,
  ImageUploadBox,
  SendButtonBox,
  ErrorMsgBox,
  FileUploadInput,
  FormStyle,
} from './MessageFormStyle';
import { PlusCircleFilled, SendOutlined } from '@ant-design/icons';
import firebase from '@/firebase';
import { useSelector } from 'react-redux';
import mime from 'mime-types';

const MessageForm = () => {
  const user = useSelector((state) => state.user.currentUser);
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const isPrivateChatRoom = useSelector((state) => state.chatRoom.isPrivateChatRoom);

  const messagesRef = firebase.database().ref('messages');
  // const userConnectRef = firebase.database().ref('info/connected');
  // console.log('userConnectRef: ', userConnectRef);
  const inputOpenImageRef = useRef();
  const storageRef = firebase.storage().ref();

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

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

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const getPath = () => {
    if (isPrivateChatRoom) return `/message/private/${chatRoom.id}`;
    else return `/message/public`;
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const filePath = `${getPath()}/${file.name}`;
    const metadata = { contentType: mime.lookup(file.name) };
    setLoading(true);
    try {
      // Challenge2: async await의 사용에 대해 더 이해하게 된 부분
      let uploadFile = storageRef.child(filePath).put(file, metadata);
      uploadFile.on(
        'state_changed',
        (UploadTaskSnapshot) => {
          const percent = Math.round(
            (UploadTaskSnapshot.bytesTransferred / UploadTaskSnapshot.totalBytes) * 100,
          );
          setPercentage(percent);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
        () => {
          uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {
            messagesRef.child(chatRoom.id).push().set(createMessage(downloadURL));
            setLoading(false);
          });
        },
      );
    } catch (error) {
      console.error(error);
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
      <FormStyle onSubmit={handleSubmit}>
        <ImageUploadBox>
          <PlusCircleFilled onClick={handleOpenImageRef} />
        </ImageUploadBox>
        <TextAreaBox
          placeholder='# First Channel - Send message..'
          autoSize={{ minRows: 1, maxRows: 6 }}
          value={content}
          onChange={handleChange}
          onKeyPress={onKeydownChat}
        />
        <SendButtonBox>
          <SendOutlined onClick={handleSubmit} />
        </SendButtonBox>
      </FormStyle>

      {!(percentage === 0 || percentage === 100) && (
        <Progress percent={percentage} strokeColor='#058569' size='small' />
      )}

      <div>
        {errors.map((errorMsg, i) => (
          <ErrorMsgBox key={i}>{errorMsg}</ErrorMsgBox>
        ))}
      </div>

      {/* Invisible */}
      <FileUploadInput
        accept='image/jpeg, image/png'
        type='file'
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
      />
    </div>
  );
};

export default MessageForm;
