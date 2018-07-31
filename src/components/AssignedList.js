import React from 'react';
import { Message } from 'semantic-ui-react';

const AssignedList = ({ assignedRoomInfo: { assigned, usage } }) => {
  const splitCustomers = assigned.reduce(
    (acc, customer) => {
      if (customer.premium === true) acc.premium.push(customer.willPay);
      else acc.economy.push(customer.willPay);
      return acc;
    },
    { premium: [], economy: [] },
  );

  return (
    <Message>
      {['premium', 'economy'].map(roomType => (
        <div style={{ marginBottom: 20 }} key={roomType}>
          <h2 className="ui header">
            {roomType.replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          <h4>
            {usage[roomType].rooms} rooms assigned (€
            {usage[roomType].money} total)
          </h4>
          <div className="ui list">
            {splitCustomers[roomType].map(willPay => (
              <div key={willPay} className="item">
                €{willPay}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Message>
  );
};

export default AssignedList;
