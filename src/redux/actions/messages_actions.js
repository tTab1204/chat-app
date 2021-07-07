import { SET_MESSAGES, SET_FILTERED_MESSAGES } from '@types/types';

export const showMessages = (messages, chatRoomName) => {
  return {
    type: SET_MESSAGES,
    payload: { messages, chatRoomName },
  };
};

export const showFilteredMessages = (filteredMessages) => {
  return {
    type: SET_FILTERED_MESSAGES,
    payload: filteredMessages,
  };
};
