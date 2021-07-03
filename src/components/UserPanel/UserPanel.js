import React, { useRef } from 'react';
import { UserPanelContainer, ImgBox } from './UserPanelStyle';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '@/firebase';
import mime from 'mime-types';
import { setPhotoURL } from '@redux/actions/user_actions';

const UserPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const inputOpenImageRef = useRef();

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const metatdata = { contentType: mime.lookup(file.name) };

    try {
      // store image file in storage
      let uploadTaskSnapshot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metatdata);

      // get download URL
      let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

      // update profile
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL,
      });
      dispatch(setPhotoURL(downloadURL));

      // update DB
      await firebase.database().ref('users').child(user.uid).update({ image: downloadURL });
    } catch (e) {
      console.error(e);
    }
  };

  const menu = (
    <Menu theme='dark'>
      <Menu.Item key='change_profile' onClick={handleOpenImageRef}>
        Change Profile Image
      </Menu.Item>
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
      <input
        onChange={handleUploadImage}
        accept='image/jpeg, image/png'
        style={{ display: 'none' }}
        ref={inputOpenImageRef}
        type='file'
      />
    </UserPanelContainer>
  );
};

export default UserPanel;
