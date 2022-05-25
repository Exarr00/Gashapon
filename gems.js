const addAmount = (currAmount, amount) => {
  currAmount += amount;
  return currAmount;
};

const subtractAmount = (currAmount, amount) => {
  if (currAmount >= amount) {
    currAmount -= amount;
  }
  return currAmount;
};

export default { addAmount, subtractAmount };
