import services from './service.js';
import gacha from './gacha.js';

import gems from './gems.js';

import history from './history.js';

const singleSummon = document.getElementById('single');
const multiSummon = document.getElementById('multi');
const testGetHistory = document.getElementById('history');

//get user's gem data from localstorage
let GEM_COUNT = localStorage.getItem('GEMS_AMT');
//set user's gem data to element
document.getElementById('GEM_AMT').textContent = GEM_COUNT;

let historyList = document.getElementById("history-list");

const updateList = (summons) => {
  summons.forEach((summon) => {
    let item = document.createElement("div");
    item.textContent = summon.name;
    historyList.appendChild(item);
  });
};

services().then((data) => {
    gacha.setGacha(data);
    singleSummon.disabled = false;
    multiSummon.disabled = false;
    testGetHistory.disabled = false;
});

//check if user has reached >10k gems
const whaleWatchers = () => {
    let gems = localStorage.getItem('GEMS_AMT');
    let icon = document.getElementById('whale_icon');
    if (gems >= 10000) {
        if (icon.hasAttribute('hidden')) {
            icon.removeAttribute('hidden');
        }
        return;
    }
    document.getElementById('whale_icon').setAttribute('hidden', true);
};

whaleWatchers();

//single summon
singleSummon.addEventListener('click', (e) => {
    GEM_COUNT = localStorage.getItem('GEMS_AMT');
    if (gems.useGems(GEM_COUNT, e)) {
        const result = gacha.roll();
        history.updateHistory(result);
        console.log(result);
        whaleWatchers();
    } else {
        window.alert('not enough gems');
    }
});

//multi summon

multiSummon.addEventListener('click', (e) => {
    GEM_COUNT = localStorage.getItem('GEMS_AMT');
    if (gems.useGems(GEM_COUNT, e)) {
        const result = gacha.multiRoll();
        history.updateHistory(...result);
        console.log(result);
        updateList(summons);
        whaleWatchers();
    } else {
        window.alert('not enough gems');
    }

});

const incrementBtns = document.querySelectorAll('.qwer');

//purchasing gems function
incrementBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        GEM_COUNT = Number(localStorage.getItem('GEMS_AMT'));
        gems.purchaseGems(GEM_COUNT, Number(btn.value));
        whaleWatchers();
    });
});

//////////////////////////////////////////////////////////////

testGetHistory.addEventListener('click', () => {
    console.log(history.getHistory());
});
