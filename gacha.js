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

/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
const shuffle = (array) => {
  let currIndex = array.length,
    randIndex;
  while (currIndex > 0) {
    randIndex = Math.floor(Math.random() * currIndex);
    currIndex--;
    [array[currIndex], array[randIndex]] = [array[randIndex], array[currIndex]];
  }
  return array;
};

const roll = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const baseProbability = generateRange(940, 53, 7);

const testChance = (probability) => {
  for (let i = 0; i < 100; i++) {
    let three = 0,
      four = 0,
      five = 0;
    for (let j = 0; j < 100; j++) {
      let rolled = roll(probability);
      if (rolled === 3) {
        three += 1;
      } else if (rolled === 4) {
        four += 1;
      } else {
        five += 1;
      }
    }
    console.log(
      Math.round((three / 100) * 100),
      Math.round((four / 100) * 100),
      Math.round((five / 100) * 100)
    );
  }
};

// testChance(baseProbability);

export default { generateRange, testChance };
