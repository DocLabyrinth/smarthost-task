import { ROOMS_SET_AVAILABLE } from '../actions/constants';

const defaultState = {
  available: { premium: 0, economy: 0 },
  usage: [
    // {type: 'premium', price: 0}
  ],
};

const calculateUsage = ({ available: { premium, economy } }) => {};

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

      newState.usage = calculateUsage(newState);

      return newState;
    default:
      return state;
  }
};

export default rooms;
