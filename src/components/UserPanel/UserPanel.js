import React from 'react';
import { UserPanelContainer, ImgBox } from './UserPanelStyle';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import firebase from '@/firebase';

const UserPanel = () => {
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const menu = (
    <Menu theme='dark'>
      <Menu.Item key='change_profile'>Change Profile Image</Menu.Item>
      <Menu.Item key='logout' onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <UserPanelContainer>
      <ImgBox>
        <img src={user?.photoURL} alt='user_img' />
      </ImgBox>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type='primary' onClick={(e) => e.preventDefault()}>
          {user?.displayName} <DownOutlined />
        </Button>
      </Dropdown>
    </UserPanelContainer>
  );
};

export default UserPanel;
