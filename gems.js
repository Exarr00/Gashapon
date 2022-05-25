const addAmount = (currAmount, amount) => {
  currAmount += amount;
  console.log("currAmt: ", currAmount);
  console.log("Amt: ", amount);
  return currAmount;
};

const subtractAmount = (currAmount, amount) => {
  if (currAmount >= 100) {
    currAmount -= amount;
  }
  return currAmount;
};

export default { addAmount, subtractAmount };
