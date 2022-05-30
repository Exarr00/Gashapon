import services from "./service.js";
import gacha from "./gacha.js";

import gems from "./gems.js";

import history from "./history.js";

const singleSummon = document.getElementById("single");
const multiSummon = document.getElementById("multi");
const testGetHistory = document.getElementById("history-open");

//get user's gem data from localstorage
let GEM_COUNT = localStorage.getItem("GEMS_AMT");
//set user's gem data to element
document.getElementById("GEM_AMT").textContent = GEM_COUNT;

let historyList = document.getElementById("history-table");

services().then((data) => {
  gacha.setGacha(data);
  singleSummon.disabled = false;
  multiSummon.disabled = false;
  testGetHistory.disabled = false;
});

//check if user has reached >10k gems
const whaleWatchers = () => {
  let gems = localStorage.getItem("GEMS_AMT");
  let icon = document.getElementById("whale_icon");
  if (gems >= 10000) {
    if (icon.hasAttribute("hidden")) {
      icon.removeAttribute("hidden");
    }
    return;
  }
  document.getElementById("whale_icon").setAttribute("hidden", true);
};

whaleWatchers();

//single summon
singleSummon.addEventListener("click", (e) => {
  GEM_COUNT = localStorage.getItem("GEMS_AMT");
  if (gems.useGems(GEM_COUNT, e)) {
    const result = gacha.roll();
    history.updateHistory(result);
    console.log(result);
    whaleWatchers();
  } else {
    window.alert("not enough gems");
  }
});

//multi summon

multiSummon.addEventListener("click", (e) => {
  GEM_COUNT = localStorage.getItem("GEMS_AMT");
  if (gems.useGems(GEM_COUNT, e)) {
    const result = gacha.multiRoll();
    history.updateHistory(...result);
    showResult(...result);
    console.log(result);
    whaleWatchers();
  } else {
    window.alert("not enough gems");
  }
});

const incrementBtns = document.querySelectorAll(".qwer");

//purchasing gems function
incrementBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    GEM_COUNT = Number(localStorage.getItem("GEMS_AMT"));
    gems.purchaseGems(GEM_COUNT, Number(btn.value));
    whaleWatchers();
  });
});

//////////////////////////////////////////////////////////////

const pageBtns = document.querySelectorAll(".btn-pagination");
const pageNumber = document.getElementById("current-number");
console.log(historyList);

const changePage = () => {
  let x = history
    .getHistory()
    .slice(
      (Number(pageNumber.textContent) - 1) * 7,
      7 * Number(pageNumber.textContent)
    );
  while (historyList.childElementCount > 1) {
    historyList.removeChild(historyList.lastChild);
  }
  x.forEach((historyItem) => {
    let itemName = document.createElement("td");
    let itemDate = document.createElement("td");
    let tableRow = document.createElement("tr");
    itemName.textContent = historyItem.name;
    itemDate.textContent = historyItem.date.toDateString();
    tableRow.appendChild(itemName);
    tableRow.appendChild(itemDate);
    historyList.appendChild(tableRow);
  });
};

testGetHistory.addEventListener("click", () => changePage());

pageBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.value === "previous") {
      if (Number(pageNumber.textContent) > 1) {
        pageNumber.textContent = Number(pageNumber.textContent) - 1;
        changePage();
      }
      return;
    }
    if (
      history.getHistory().length / 7 > 1 &&
      history.getHistory().length / 7 > Number(pageNumber.textContent)
    ) {
      pageNumber.textContent = Number(pageNumber.textContent) + 1;
      changePage();
    }
  });
});

/////////////////////////////////////
const box = document.querySelector('.box')

const showResult = (...result) => {
  box.replaceChildren();
  result.forEach(element => {
    let outercard = document.createElement('div')
    let attribute = document.createElement('div')
    let rating = document.createElement('div')
    let name = document.createElement('div')
    let cardImg = document.createElement('img')
    cardImg.src = `./cards/${element.name.split(' ').join('_')}.png`
    const color = getRateColor(element.rating)
    outercard.classList.add('card', color)
    attribute.classList.add('attribute')
    attribute.style.background = `url(./cards/${element.attribute.toUpperCase()}.png) 0% 0% / 100% no-repeat`
    rating.classList.add('rating')
    let charRating = element.rating
    while(charRating > 0){
      let star = document.createElement('div')
      star.classList.add('star')
      rating.appendChild(star)
      charRating--
    }
    name.classList.add('name')
    name.textContent = element.name;
    outercard.append(attribute, cardImg, rating, name)
    box.append(outercard)
  })
}

const getRateColor = (rate) => {
  switch(rate){
    case 3: 
      return 'bronze'
    case 4: 
      return 'silver'
    case 5: 
      return 'gold'
  }
}

