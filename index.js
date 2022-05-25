
import gacha from './gacha.js';
import characters from './characters.json' assert { type: 'json' };

import roll from "./gacha.js";
import gems from "./gems.js";
let history = [];
let GEM_COUNT = localStorage.getItem("GEMS_AMT");
document.getElementById("GEM_AMT").textContent = GEM_COUNT;


console.log(characters);
const baseProbability = gacha.generateRange(940, 53, 7);
gacha.setGacha(characters);
console.log(gacha.roll(baseProbability))
console.log(gacha.multiRoll(baseProbability))
// roll.testChance(baseProbability);

const purchaseGems = (e) => {
  let amount = Number(e.target.value);
  GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
  let newAmount = gems.addAmount(GEM_COUNT, amount);
  localStorage.setItem("GEMS_AMT", newAmount);
  document.getElementById("GEM_AMT").textContent = GEM_COUNT;
};

const useGems = (e) => {
  let amount = Number(e.target.value);
  GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
  let newAmount = gems.subtractAmount(GEM_COUNT, amount);
  localStorage.setItem("GEMS_AMT", newAmount);
  document.getElementById("GEM_AMT").textContent = GEM_COUNT;
};

const incrementBtns = document.querySelectorAll("#qwer");

incrementBtns.forEach((btn) => {
  btn.addEventListener("click", purchaseGems);
});

const decrementBtns = document.querySelectorAll("#asdf");

decrementBtns.forEach((btn) => {
  btn.addEventListener("click", useGems);
});

