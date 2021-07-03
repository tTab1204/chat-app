import { SET_USER } from '@/types/types';
import { SET_PHOTO_URL } from '../../types/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: { ...state.currentUser, photoURL: action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
