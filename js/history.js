const history = [];
let historyList = document.getElementById("history-table");
const pageNumber = document.getElementById("current-number");

const getHistory = () => {
  const actualHistory = history.reverse();
  return actualHistory;
};

const checkPrevious = () => {
  if (Number(pageNumber.textContent) > 1) {
    pageNumber.textContent = Number(pageNumber.textContent) - 1;
    changePage();
  }
};

const checkNext = () => {
  if (
    getHistory().length / 7 > 1 &&
    getHistory().length / 7 > Number(pageNumber.textContent)
  ) {
    pageNumber.textContent = Number(pageNumber.textContent) + 1;
    changePage();
  }
};

const updateHistory = (...result) => {
  console.log(result);
  const the_history = result.reduce((rollInfo, { name, rating }) => {
    rollInfo.push({
      name: name,
      rating: rating,
      date: new Date(),
    });
    return rollInfo;
  }, []);
  history.push(...the_history);
};

const addListeners = () => {
  document.querySelectorAll("#historyImageSmall").forEach((item) => {
    item.addEventListener("click", (item2) => {
      if (item2.target.nextSibling) {
        item2.target.nextSibling.style.display = "block";
      }
    });
  });
  document.querySelectorAll(".closeImage").forEach((closeItem) => {
    closeItem.addEventListener("click", (closeItem2) => {
      closeItem2.target.parentNode.style.display = "none";
    });
  });
};

const subFunction = (cell, data) => {
  let itemImageCell = document.createElement("td");
  let imageSmall = document.createElement("img");
  let imageLarge = document.createElement("img");
  let imageModal = document.createElement("div");
  let closeImage = document.createElement("span");

  imageSmall.src = `./imgs/cards/${data.name.split(" ").join("_")}.png`;
  imageLarge.src = `./imgs/cards/${data.name.split(" ").join("_")}.png`;
  imageLarge.setAttribute("id", "modal-content-img");
  itemImageCell.setAttribute("id", "historyImageSmall");
  imageModal.setAttribute("id", "modalImg");
  closeImage.setAttribute("class", "closeImage");
  closeImage.textContent = "X";

  imageModal.appendChild(closeImage);
  imageModal.appendChild(imageLarge);
  itemImageCell.appendChild(imageSmall);
  itemImageCell.appendChild(imageModal);
  cell.appendChild(itemImageCell);

  addListeners();
};

const changePage = () => {
  let x = getHistory().slice(
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
    subFunction(tableRow, historyItem);
    tableRow.appendChild(itemName);
    tableRow.appendChild(itemDate);
    tableRow.appendChild(itemRating);
    historyList.appendChild(tableRow);
  });
};

export default {
  getHistory,
  updateHistory,
  changePage,
  checkPrevious,
  checkNext,
};
