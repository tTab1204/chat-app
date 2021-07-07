import { combineReducers } from 'redux';
import user from './user_reducer';
import chatRoom from './chatRoom_reducer';
import messages from './messages_reducer';
import menu from './menu_reducer';

const rootReducer = combineReducers({
  user,
  chatRoom,
  messages,
  menu,
});

export default rootReducer;
