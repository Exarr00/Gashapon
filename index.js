import services from './service.js';
import gacha from './gacha.js';

import gems from './gems.js';

let GEM_COUNT = localStorage.getItem('GEMS_AMT');
document.getElementById('GEM_AMT').textContent = GEM_COUNT;

services().then((data) => {
    gacha.setGacha(data);
    singleSummon.disabled = false;
    multiSummon.disabled = false;
});

const singleSummon = document.getElementById('single');
const multiSummon = document.getElementById('multi');

singleSummon.addEventListener('click', () =>
    console.log(gacha.roll())
);
multiSummon.addEventListener('click', () =>
    console.log(gacha.multiRoll())
);


const purchaseGems = (e) => {
    let amount = Number(e.target.value);
    GEM_COUNT = Number(localStorage.getItem('GEMS_AMT'));
    let newAmount = gems.addAmount(GEM_COUNT, amount);
    localStorage.setItem('GEMS_AMT', newAmount);
    document.getElementById('GEM_AMT').textContent = GEM_COUNT;
};

const useGems = (e) => {
    let amount = Number(e.target.value);
    GEM_COUNT = Number(localStorage.getItem('GEMS_AMT'));
    let newAmount = gems.subtractAmount(GEM_COUNT, amount);
    localStorage.setItem('GEMS_AMT', newAmount);
    document.getElementById('GEM_AMT').textContent = GEM_COUNT;
};

const incrementBtns = document.querySelectorAll('#qwer');

incrementBtns.forEach((btn) => {
    btn.addEventListener('click', purchaseGems);
});

const decrementBtns = document.querySelectorAll('#asdf');

decrementBtns.forEach((btn) => {
    btn.addEventListener('click', useGems);
});
