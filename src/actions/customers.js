import { CUSTOMERS_UPDATE } from './constants';

export const updateCustomers = ({ customers }) => ({
  type: CUSTOMERS_UPDATE,
  payload: {
    customers,
  },
});
