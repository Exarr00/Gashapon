const history = [];
let historyList = document.getElementById("history-table");
const pageNumber = document.getElementById("current-number");
const rarity = { 3: "bronzeHistory", 4: "silverHistory", 5: "goldHistory" };

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

const removeChildren = () => {
  while (historyList.childElementCount > 1) {
    historyList.removeChild(historyList.lastChild);
  }
};

const createChildren = (item, rarity) => {
  //create elements for the table
  let itemName = document.createElement("td");
  let itemDate = document.createElement("td");
  let itemRating = document.createElement("td");
  let tableRow = document.createElement("tr");
  let itemImageCell = document.createElement("td");
  let imageSmall = document.createElement("img");

  tableRow.classList.add(rarity);
  //set content and attributes for elements
  imageSmall.src = `./imgs/cards/${item.name.split(" ").join("_")}.png`;
  itemImageCell.setAttribute("class", "historyImageSmall");

  itemName.textContent = item.name;
  itemDate.textContent = item.date.toDateString();
  itemRating.textContent = item.rating;

  //Append elements to table
  itemImageCell.appendChild(imageSmall);
  tableRow.appendChild(itemImageCell);
  tableRow.appendChild(itemName);
  tableRow.appendChild(itemDate);
  tableRow.appendChild(itemRating);
  historyList.appendChild(tableRow);
};

const addListeners = () => {
  //Elements for image modal
  let imageLarge = document.createElement("img");
  let imageModal = document.createElement("div");
  let imageCaption = document.createElement("div");
  let closeImage = document.createElement("span");

  //Set content for image modal
  imageLarge.setAttribute("id", "modal-content-img");
  imageModal.setAttribute("id", "modalImg");
  imageCaption.setAttribute("id", "imageCaption");
  closeImage.setAttribute("id", "closeImage");
  closeImage.textContent = "X";

  //Append image modal to table
  imageModal.appendChild(closeImage);
  imageModal.appendChild(imageLarge);
  imageModal.appendChild(imageCaption);
  historyList.appendChild(imageModal);

  //add image click listeners
  document.querySelectorAll(".historyImageSmall").forEach((item) => {
    item.addEventListener("click", (item2) => {
      console.log(item2);
      if (document.getElementById("modalImg").style.display !== "block") {
        document.getElementById("modal-content-img").src = item2.target.src;
        //hacky solution to set caption to textconent associated with image
        document.getElementById("imageCaption").textContent = item2.target.src
          .substring(33)
          .replace(".png", "")
          .replaceAll("_", " ");
        document.getElementById("modalImg").style.display = "block";
      }
    });
  });
  document.getElementById("closeImage").addEventListener("click", () => {
    document.getElementById("modalImg").style.display = "none";
  });
};

const changePage = () => {
  let x = getHistory().slice(
    (Number(pageNumber.textContent) - 1) * 7,
    7 * Number(pageNumber.textContent)
  );
  removeChildren();
  x.forEach((historyItem) => {
    createChildren(historyItem, rarity[String(historyItem.rating)]);
  });

  addListeners();
};

const filterForFour = () => {
  const fourStarList = history.filter((item) => item.rating === 4);
  removeChildren();
  fourStarList.forEach((item) => {
    createChildren(item, rarity[String(item.rating)]);
  });
  addListeners();
};

export default {
  getHistory,
  updateHistory,
  changePage,
  checkPrevious,
  checkNext,
  filterForFour,
};
