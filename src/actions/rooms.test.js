import { setAvailableRooms } from './rooms';
import { ROOMS_SET_AVAILABLE } from './constants';

describe('setAvailableRooms action creator', () => {
  it('returns a usable action', () => {
    expect(setAvailableRooms({ premium: 1, economy: 1 })).toEqual({
      type: ROOMS_SET_AVAILABLE,
      payload: {
        premium: 1,
        economy: 1,
      },
    });
  });
});
