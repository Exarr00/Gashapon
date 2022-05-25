import roll from "./gacha.js";
import gems from "./gems.js";

let history = [];
let GEM_COUNT = localStorage.getItem("GEMS_AMT");

const baseProbability = roll.generateRange(940, 53, 7);
// roll.testChance(baseProbability);

const purchaseGems = (amount) => {
  let GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
  let newAmount = gems.addAmount(GEM_COUNT, amount);
  localStorage.setItem("GEMS_AMT", newAmount);
};

const button = document.getElementById("qwer");

button.addEventListener("click", () => {
  purchaseGems(100);
});

const useGems = (amount) => {
  let newAmount = gems.subtractAmount(GEM_COUNT, amount);
  localStorage.setItem("gems", newAmount);
};
