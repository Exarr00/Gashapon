import services from "./service.js";
import gacha from "./gacha.js";

import gems from "./gems.js";

import history from "./history.js";

const singleSummon = document.getElementById("single");
const multiSummon = document.getElementById("multi");
const testGetHistory = document.getElementById("history-open");

//get user's gem data from localstorage
let GEM_COUNT = localStorage.getItem("GEMS_AMT");

//initiate purchase amount to 0
let PURCHASE_AMOUNT = 0;
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
  let icon = document.querySelectorAll(".status_icon");
  let currStatus =
    PURCHASE_AMOUNT >= 10000 ? 2 : PURCHASE_AMOUNT >= 5000 ? 1 : 0;
  icon.forEach((item) => {
    if (item !== icon[currStatus]) {
      item.setAttribute("hidden", true);
      return;
    }
    item.removeAttribute("hidden");
  });
  console.log(icon[currStatus]);
};

//initial page load check
whaleWatchers();

//single summon
singleSummon.addEventListener("click", (e) => {
  GEM_COUNT = localStorage.getItem("GEMS_AMT");
  if (gems.useGems(GEM_COUNT, e)) {
    const result = gacha.roll();
    history.updateHistory(result);
    tosummon();
    showResult(result);
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
    tosummon();
    showResult(...result);
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
    PURCHASE_AMOUNT += Number(btn.value);
    whaleWatchers();
  });
});

//////////////////////////////////////////////////////////////

const pageBtns = document.querySelectorAll(".btn-pagination");
const pageNumber = document.getElementById("current-number");

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
    let itemRating = document.createElement("td");
    let tableRow = document.createElement("tr");
    itemName.textContent = historyItem.name;
    itemDate.textContent = historyItem.date.toDateString();
    itemRating.textContent = historyItem.rating;
    tableRow.appendChild(itemName);
    tableRow.appendChild(itemDate);
    tableRow.appendChild(itemRating);
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
//5/29 scripts that need to be integrated and divided in own files

const modal = document.querySelector("#modal");
const historyModal = document.querySelector("#historyModal");
const historyOpen = document.querySelector(".history-open");
const historyClose = document.querySelector(".history-close");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

historyOpen.addEventListener("click", () => {
  changePage();
  historyModal.showModal();
});

historyClose.addEventListener("click", () => {
  historyModal.close();
});

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

/*andy's script */
const videoContainer = document.querySelector(".video-container");
const video = document.querySelector("video");
const container = document.querySelector(".container");
const closeBtn = document.querySelector(".close");
const skipBtn = document.querySelector("#skip");

const tosummon = () => {
  videoContainer.style.display = "inline";
  video.play();
};

const gotosummon = () => {
  videoContainer.style.display = "none";
  console.log(getComputedStyle(container).display);
  container.style.display = "grid";
};

const toClose = () => {
  container.style.display = "none";
};

const toSkip = () => {
  video.currentTime = video.duration;
};

video.addEventListener("ended", gotosummon);
closeBtn.addEventListener("click", toClose);
skipBtn.addEventListener("click", toSkip);

//post summon screen
/////////////////////////////////////
const box = document.querySelector(".box");

const showResult = (...result) => {
  let x = 0;
  box.replaceChildren();
  let ratingArr = ["x", "x", "x", "bronze", "silver", "gold"];
  result.forEach((element) => {
    let outercard = document.createElement("div");
    let attribute = document.createElement("div");
    let rating = document.createElement("div");
    let name = document.createElement("div");
    let cardImg = document.createElement("img");
    cardImg.src = `./imgs/cards/${element.name.split(" ").join("_")}.png`;
    const color = ratingArr[element.rating];
    outercard.classList.add("card", color);
    attribute.classList.add("attribute");
    attribute.style.background = `url(./imgs/elements/${element.attribute.toUpperCase()}.png) 0% 0% / 100% no-repeat`;
    rating.classList.add("rating");
    let charRating = element.rating;
    while (charRating > 0) {
      let star = document.createElement("div");
      star.classList.add("star");
      rating.appendChild(star);
      charRating--;
    }
    name.classList.add("name");
    name.textContent = element.name;
    outercard.append(attribute, cardImg, rating, name);
    box.append(outercard);
  });
};
