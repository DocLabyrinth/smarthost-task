import { ROOMS_SET_AVAILABLE } from './constants';

export const setAvailableRooms = ({ premium, economy }) => ({
  type: ROOMS_SET_AVAILABLE,
  payload: {
    premium,
    economy,
  },
});
