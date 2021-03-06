let gacha = [];
let fiveStarCounter = 0;
let fourStarCounter = 0;
let onSoft = false;
let guaranteedFourStar = false;
let guaranteedFiveStar = false;

const setGacha = (units) => {
  gacha = [];
  gacha.push(...units);
};

const getRandNum = (max) => {
  return Math.floor(Math.random() * max);
};

const generateRange = (...ranges) => {
  const chance = [];
  ranges.forEach((range, star) => {
    chance.push(...generateCount(range, star + 3));
  });
  shuffle(chance);
  return chance;
};

const generateCount = (range, star) => {
  const result = [];
  while (range) {
    result.push(star);
    range--;
  }
  return result;
};

//Fisher-Yates(Knuth) Shuffle
const shuffle = (array) => {
  let currIndex = array.length,
    randIndex;
  while (currIndex > 0) {
    randIndex = getRandNum(currIndex);
    currIndex--;
    [array[currIndex], array[randIndex]] = [array[randIndex], array[currIndex]];
  }
  return array;
};

const roll = () => {
  fourStarCounter++;
  fiveStarCounter++;
  if (fiveStarCounter === 100 || fiveStarCounter === 135) {
    return getResult(5);
  } else if (fourStarCounter >= 10) {
    return getResult(4);
  } else {
    if (!onSoft) {
      return getResult(baseProbability[getRandNum(baseProbability.length)]);
    } else {
      return getResult(pityProbability[getRandNum(pityProbability.length)]);
    }
  }
};

const multiRoll = () => {
  const multiResults = [];
  for (let i = 0; i < 10; i++) {
    multiResults.push(roll());
  }
  return multiResults;
};

const getResult = (rarity) => {
  if (rarity === 3) {
    return getThreeStar();
  } else if (rarity === 4) {
    return getFourStar();
  } else if (rarity === 5) {
    return getFiveStar();
  }
};

const getUnits = (rarity) => {
  const unitArr = gacha.filter((unit) => unit.rating === rarity);
  return shuffle(unitArr);
};

const coinToss = () => {
  return getRandNum(2);
};

const getThreeStar = () => {
  const threeStars = getUnits(3);
  return threeStars[getRandNum(threeStars.length - 1)];
};

const getFourStar = () => {
  const fourStars = getUnits(4);
  if (!guaranteedFourStar) {
    guaranteedFourStar = coinToss();
  }
  if (guaranteedFourStar) {
    guaranteedFourStar = false;
    fourStarCounter = 0;
    const randFeaturedFour = getRandNum(3);
    return fourStars.filter((star) => star.featured === true)[randFeaturedFour];
  }
  guaranteedFourStar = true;
  fourStarCounter = 0;
  const randFour = getRandNum(fourStars.length - 3);
  return fourStars.filter((star) => star.featured === false)[randFour];
};

const getFiveStar = () => {
  const fiveStars = getUnits(5);
  if (!guaranteedFiveStar) {
    guaranteedFiveStar = coinToss();
  }
  if (guaranteedFiveStar) {
    guaranteedFiveStar = false;
    onSoft = false;
    fiveStarCounter = 0;
    return fiveStars.filter((star) => star.featured === true)[0];
  }
  guaranteedFiveStar = true;
  fiveStarCounter = 100;
  onSoft = true;
  const randFive = getRandNum(fiveStars.length - 1);
  return fiveStars.filter((star) => star.featured === false)[randFive];
};

const baseProbability = generateRange(940, 53, 7);
const pityProbability = generateRange(932, 53, 15);

//Different Banner code //Standard Banner

const getStandardResult = (rarity) => {
  if (rarity === 3) {
    return getThreeStar();
  } else if (rarity === 4) {
    return getStandardFourStar();
  } else if (rarity === 5) {
    return getStandardFiveStar();
  }
};

const getStandardFourStar = () => {
  const fourStars = getUnits(4);
  fourStarCounter = 0;
  const d = new Date();
  const RAND_NUM = Math.round((d.getTime() * Math.random()) % 9);
  return fourStars[RAND_NUM];
};

const getStandardFiveStar = () => {
  const fiveStars = getUnits(5);
  if (guaranteedFiveStar) {
    guaranteedFiveStar = false;
    fiveStarCounter = 0;
  }
  const d = new Date();
  const RAND_NUM = Math.round((d.getTime() * Math.random()) % 4);
  return fiveStars[RAND_NUM];
};

const standardRoll = () => {
  fourStarCounter++;
  fiveStarCounter++;
  if (fiveStarCounter === 100) {
    guaranteedFiveStar = true;
    return getStandardResult(5);
  } else if (fourStarCounter === 10) {
    return getStandardResult(4);
  } else {
    return getStandardResult(
      baseProbability[getRandNum(baseProbability.length)]
    );
  }
};

const standardMultiRoll = () => {
  const multiResults = [];
  for (let i = 0; i < 10; i++) {
    multiResults.push(standardRoll());
  }
  return multiResults;
};

export default { roll, setGacha, multiRoll, standardRoll, standardMultiRoll };
