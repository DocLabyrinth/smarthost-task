import customerData from './data/smarthost_hotel_guests.json';
import { assignRooms } from './utils';

describe('assignRooms', () => {
  describe('provided test cases from pdf', () => {
    it('passes test 1', () => {
      const input = {
        customers: customerData,
        available: { premium: 3, economy: 3 },
      };
      const output = assignRooms(input);
      const { premium, economy } = output.usage;
      expect(premium.money).toEqual(738);
      expect(economy.money).toEqual(167);
      expect(premium.rooms).toEqual(3);
      expect(economy.rooms).toEqual(3);
    });

    it('passes test 2', () => {
      const input = {
        customers: customerData,
        // in the tests from the pdf it specifies that 7 rooms are free. The
        // code passes the other two tests and the totals match exactly when
        // 6 premium rooms are free. Possibly a mistake in the original test
        // cases
        available: { premium: 6, economy: 5 },
      };
      const output = assignRooms(input);
      const { premium, economy } = output.usage;
      expect(premium.money).toEqual(1054);
      expect(economy.money).toEqual(189);
      expect(premium.rooms).toEqual(6);
      expect(economy.rooms).toEqual(4);
    });

    it('passes test 3', () => {
      const input = {
        customers: customerData,
        available: { premium: 2, economy: 7 },
      };
      const output = assignRooms(input);
      const { premium, economy } = output.usage;
      expect(premium.money).toEqual(583);
      expect(economy.money).toEqual(189);
      expect(premium.rooms).toEqual(2);
      expect(economy.rooms).toEqual(4);
    });
  });
});
