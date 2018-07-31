// sort in reverse order
const sortCustomers = (a, b) => {
  if (a === b) return 0;
  return a < b ? 1 : -1;
};

export const assignRooms = ({
  customers,
  available: { premium: premiumCount, economy: economyCount },
}) => {
  // // sort them so the highest paying customers appear first
  customers.sort(sortCustomers);

  let premiumRemaining = premiumCount;

  // split the array into potential premium customers and potential economy
  const firstEconomyIndex = customers.findIndex(willPay => willPay < 100);
  const premiumCustomers = customers.slice(0, firstEconomyIndex);
  const economyCustomers = customers.slice(firstEconomyIndex);

  // assign all premium customers to premium rooms if they are available
  const assigned = premiumCustomers
    .slice(0, premiumCount)
    .map(willPay => {
      premiumRemaining--;
      return { willPay, premium: true };
    })
    .concat(
      economyCustomers
        // avoid assigning more rooms than are actually available
        .slice(0, economyCount)
        .map(willPay => {
          if (premiumRemaining < 1) return { willPay, premium: false };
          premiumRemaining--;
          return { willPay, premium: true };
        }),
    );

  const usage = assigned.reduce(
    (acc, customerObj) => {
      if (customerObj.premium) {
        acc.premium.money += customerObj.willPay;
        acc.premium.rooms++;
      } else {
        acc.economy.money += customerObj.willPay;
        acc.economy.rooms++;
      }
      return acc;
    },
    { premium: { money: 0, rooms: 0 }, economy: { money: 0, rooms: 0 } },
  );

  return {
    assigned,
    usage,
  };
};
