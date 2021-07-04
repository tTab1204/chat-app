import React from 'react';
import { Form, Input, Progress } from 'antd';
import { TextAreaBox, ImageUploadBox } from './MessageFormStyle';
import { PlusCircleFilled } from '@ant-design/icons';
const MessageForm = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TextAreaBox
          placeholder='# first channel에 메시지 보내기..'
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
        <ImageUploadBox>
          <PlusCircleFilled />
        </ImageUploadBox>
      </div>
      <Progress percent={30} strokeColor='#058569' size='small' />
    </div>
  );
};

export default MessageForm;
