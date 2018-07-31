import { ROOMS_SET_AVAILABLE } from '../actions/constants';

export const defaultState = {
  available: { premium: 0, economy: 0 },
};

const rooms = (state = defaultState, action) => {
  switch (action.type) {
    case ROOMS_SET_AVAILABLE:
      const {
        payload: { premium, economy },
      } = action;

      const newState = {
        ...state,
        available: {
          premium,
          economy,
        },
      };

      return newState;

    default:
      return state;
  }
};

export default rooms;
