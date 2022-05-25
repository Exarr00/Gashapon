const addAmount = (currAmount, amount) => {
  return (currAmount += amount);
};

const subtractAmount = (currAmount, amount) => {
  return (currAmount -= amount);
};

const purchaseGems = (currAmount, amount) => {
  let newAmount = addAmount(currAmount, amount);
  localStorage.setItem("GEMS_AMT", newAmount);
  let GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
  document.getElementById("GEM_AMT").textContent = GEM_COUNT;
};

const useGems = (currAmount, e) => {
  let amount = Number(e.target.value);
  let GEM_COUNT = 0;
  if (currAmount >= amount) {
    let newAmount = subtractAmount(currAmount, amount);
    localStorage.setItem("GEMS_AMT", newAmount);
    GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
    document.getElementById("GEM_AMT").textContent = GEM_COUNT;
    return true;
  }
  GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
  document.getElementById("GEM_AMT").textContent = GEM_COUNT;
  return false;
};

export default { purchaseGems, useGems };
