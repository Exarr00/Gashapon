import gacha from './gacha.js';
import characters from './characters.json' assert { type: 'json' };
let history = [];

console.log(characters);
const baseProbability = gacha.generateRange(940, 53, 7);
gacha.setGacha(characters);
console.log(gacha.roll(baseProbability))
console.log(gacha.multiRoll(baseProbability))
