GEM_COUNT = localStorage.getItem("gems");

const getAmount = () => {
  return GEM_COUNT;
};

const addAmount = (amount) => {
  GEM_COUNT += amount;
  localStorage.setItem("gems", GEM_COUNT);
};

const subtractAmount = (amount) => {
  GEM_COUNT -= amount;
  localStorage.setItem("gems", GEM_COUNT);
};

export { getAmount, addAmount, subtractAmount };
