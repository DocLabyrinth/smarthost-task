import { CUSTOMERS_UPDATE } from './constants';
import { updateCustomers } from './customers';

export const updateCustomers = ({ customers }) => ({
  type: CUSTOMERS_UPDATE,
  payload: {
    customers,
  },
});
