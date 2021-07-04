import React, { useState } from 'react';
import { ChatListContainer } from './ChatRommsStyle';
import { FundProjectionScreenOutlinedStyle, PlusOutlinedStyle } from './ChatRommsStyle';
import { Button, Form, Modal, Input } from 'antd';

const ChatRooms = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <ChatListContainer>
        # Chat Rooms (1)
        <PlusOutlinedStyle onClick={showModal} />
      </ChatListContainer>

      {/* Modal */}
      <Modal
        theme='dark'
        title='Create a chat channel'
        visible={isModalVisible}
        footer={[
          <Button onClick={handleCancel}>Close</Button>,
          <Button type='primary'>Save</Button>,
        ]}
      >
        <Form layout='vertical'>
          <Form.Item label='Channel Name'>
            <Input
              size='large'
              placeholder='Enter your channel name'
              style={{ marginBottom: '1.5rem' }}
            />
          </Form.Item>
          <Form.Item label='Channel Description'>
            <Input size='large' placeholder='Enter your channel description' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChatRooms;
