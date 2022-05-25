import services from "./service.js";
import gacha from "./gacha.js";

import gems from "./gems.js";

let GEM_COUNT = localStorage.getItem("GEMS_AMT");
document.getElementById("GEM_AMT").textContent = GEM_COUNT;

services().then((data) => {
  gacha.setGacha(data);
  singleSummon.disabled = false;
  multiSummon.disabled = false;
});

const singleSummon = document.getElementById("single");
const multiSummon = document.getElementById("multi");

singleSummon.addEventListener("click", (e) => {
  GEM_COUNT = localStorage.getItem("GEMS_AMT");
  if (gems.useGems(GEM_COUNT, e)) {
    console.log(gacha.roll());
  } else {
    window.alert("not enough gems");
  }
});

multiSummon.addEventListener("click", (e) => {
  GEM_COUNT = localStorage.getItem("GEMS_AMT");
  if (gems.useGems(GEM_COUNT, e)) {
    console.log(gacha.multiRoll());
  } else {
    window.alert("not enough gems");
  }
});

const incrementBtns = document.querySelectorAll("#qwer");

incrementBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
    gems.purchaseGems(GEM_COUNT, Number(btn.value));
  });
});

const decrementBtns = document.querySelectorAll("#asdf");

decrementBtns.forEach((btn) => {
  btn.addEventListener("click", gems.useGems);
});
