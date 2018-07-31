import rooms, { defaultState } from './rooms';
import { setAvailableRooms } from '../actions/rooms';

describe('rooms reducer', () => {
  describe('default state', () => {
    it('returns 0 for both room types', () => {
      expect(rooms(undefined, 'SOME_ACTION')).toEqual(defaultState);
    });
  });
  it('updates the available rooms', () => {
    expect(
      rooms(undefined, setAvailableRooms({ premium: 2, economy: 2 })),
    ).toEqual({
      available: { premium: 2, economy: 2 },
    });
  });
});
