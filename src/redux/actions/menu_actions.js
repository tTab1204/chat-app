import { SET_MENU } from '@types/types';

export const isVisibleMenu = (showMenu) => {
  return {
    type: SET_MENU,
    payload: showMenu,
  };
};
