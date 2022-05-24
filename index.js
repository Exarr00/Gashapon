import roll from './gacha.js'
let history = [];

const baseProbability = roll.generateRange(940, 53, 7);
roll.testChance(baseProbability)