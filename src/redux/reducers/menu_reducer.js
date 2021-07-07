import { SET_MENU } from '@/types/types';

const initialMenuState = {
  showMenu: false,
};

const menuReducer = (state = initialMenuState, action) => {
  switch (action.type) {
    case SET_MENU:
      return { showMenu: action.payload };
    default:
      return state;
  }
};

export default menuReducer;
