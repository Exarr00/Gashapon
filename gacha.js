let gacha = [];
let fiveStarCounter = 0;
let fourStarCounter = 0;
let onSoft = false;
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

const roll = () => {
    fourStarCounter++;
    fiveStarCounter++;
    if (fourStarCounter === 10) {
        return getResult(4);
    } else if (fiveStarCounter === 100 || fiveStarCounter === 135) {
        return getResult(5);
    } else {
        if (!onSoft) {
            return getResult(
                baseProbability[getRandNum(baseProbability.length)]
            );
        } else {
            return getResult(
                pityProbability[getRandNum(pityProbability.length)]
            );
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
    return unitArr;
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
        return fourStars.filter((star) => star.featured === true)[
            randFeaturedFour
        ];
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
const pityProbability = generateRange(932, 54, 15);

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

export default { roll, setGacha, multiRoll };
