import { SET_MESSAGES } from '@/types/types';
import { SET_FILTERED_MESSAGES } from '../../types/types';

const initialMessageState = {
  messages: null,
};

const messagesReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
        chatRoomName: action.payload.chatRoomName,
      };
    case SET_FILTERED_MESSAGES:
      return {
        ...state,
        filteredMessages: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
