import { SET_USER, SET_PHOTO_URL } from '@types/types';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setPhotoURL = (photoURL) => {
  return {
    type: SET_PHOTO_URL,
    payload: photoURL,
  };
};
