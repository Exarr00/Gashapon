const history = [];
let historyList = document.getElementById('history-table');
const pageNumber = document.getElementById('current-number');

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

const changePage = () => {
  let x = getHistory().slice(
    (Number(pageNumber.textContent) - 1) * 7,
    7 * Number(pageNumber.textContent)
  );
  while (historyList.childElementCount > 1) {
    historyList.removeChild(historyList.lastChild);
  }
  x.forEach((historyItem) => {
    let itemName = document.createElement('td');
    let hiddenImage = document.createElement('img');
    let itemDate = document.createElement('td');
    let itemRating = document.createElement('td');
    let tableRow = document.createElement('tr');
    itemName.textContent = historyItem.name;
    hiddenImage.setAttribute('class', 'card-text-image');
    hiddenImage.src = `./imgs/cards/${historyItem.name
      .split(' ')
      .join('_')}.png`;
    itemDate.textContent = historyItem.date.toDateString();
    itemRating.textContent = historyItem.rating;
    itemName.append(hiddenImage);
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
