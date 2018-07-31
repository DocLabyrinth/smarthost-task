import { CUSTOMERS_UPDATE } from '../actions/constants';

const customers = (state = [], action) => {
  switch (action.type) {
    case CUSTOMERS_UPDATE:
      return action.payload.customers;
    default:
      return state;
  }
};

export default customers;
