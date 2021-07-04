import { SET_CURRENT_CHAT_ROOM } from '@/types/types';

const initialChatRoomState = {
  currentChatRoom: null,
};

const userReducer = (state = initialChatRoomState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
