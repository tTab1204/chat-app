import { SET_CURRENT_CHAT_ROOM, SET_PRIVATE_CHAT_ROOM } from '@types/types';

export const getCurrentChatRoom = (currentChatRoom) => {
  return {
    type: SET_CURRENT_CHAT_ROOM,
    payload: currentChatRoom,
  };
};

export const setPrivateChatRoom = (isPrivateChatRoom) => {
  return {
    type: SET_PRIVATE_CHAT_ROOM,
    payload: isPrivateChatRoom,
  };
};
