const purchaseGems = (amount) => {
  GEM_COUNT += amount;
  fs.writeFIle;
  getAmount();
  return;
};

const getAmount = () => {
  console.log(GEM_COUNT);
};

export { purchaseGems, getAmount };
