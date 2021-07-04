import { SET_CURRENT_CHAT_ROOM } from '@types/types';

export const getCurrentChatRoom = (currentChatRoom) => {
  return {
    type: SET_CURRENT_CHAT_ROOM,
    payload: currentChatRoom,
  };
};
