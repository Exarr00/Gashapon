let gacha = [];
let pullCounter = 0;
let sinceLastFour = 0;
let sinceLastFive = 0;
let guaranteedFourStar = false;
let guaranteedFiveStar = false;

const setGacha = (units) => {
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

/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
const shuffle = (array) => {
    let currIndex = array.length,
        randIndex;
    while (currIndex > 0) {
        randIndex = getRandNum(currIndex);
        currIndex--;
        [array[currIndex], array[randIndex]] = [
            array[randIndex],
            array[currIndex],
        ];
    }
    return array;
};

const roll = (array) => {
    pullCounter += 1;
    return getResult(array[getRandNum(array.length)]);
};

const multiRoll = (array) => {
    for (let i = 0; i < 10; i++) {
        console.log(roll(array));
    }
    return "done"
};


const getResult = (rarity) => {
    const newArr = gacha.filter((unit) => unit.rating === rarity);
    const chosen = newArr[getRandNum(newArr.length)];
    return chosen;
};

const getThreeStar = () => {
    console.log(3);
};

const getFourStar = () => {
    console.log(4);
};

const getFiveStar = () => {
    console.log(5);
};

const baseProbability = generateRange(940, 53, 7);

// const testChance = (probability) => {
//   for (let i = 0; i < 100; i++) {
//     let three = 0,
//       four = 0,
//       five = 0;
//     for (let j = 0; j < 100; j++) {
//       let rolled = roll(probability);
//       if (rolled === 3) {
//         three += 1;
//       } else if (rolled === 4) {
//         four += 1;
//       } else {
//         five += 1;
//       }
//     }
//     console.log(
//       Math.round((three / 100) * 100),
//       Math.round((four / 100) * 100),
//       Math.round((five / 100) * 100)
//     );
//   }
// };

// testChance(baseProbability);

export default { generateRange, roll, setGacha, multiRoll };



