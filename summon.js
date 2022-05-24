import { addAmount, subtractAmount, getAmount } from "./gems";

const canIRoll = (currGems) => {
  if (currGems >= 100) {
    currGems -= 100;
    GEM_COUNT = currGems;
    return true;
  }
  return false;
};

const rolling = () => {
  if (canIRoll(GEM_COUNT)) {
    console.log("Gems Remaining: " + GEM_COUNT);
    console.log("Summoned a 5 star");
  } else {
    console.log("Insufficient funds");
  }
};
