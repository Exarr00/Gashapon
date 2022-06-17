const box = document.querySelector('.box');

const showResult = (...result) => {
  let x = 0;
  box.replaceChildren();
  let ratingArr = ['x', 'x', 'x', 'bronze', 'silver', 'gold'];
  result.forEach((element) => {
    let outercard = document.createElement('div');
    let attribute = document.createElement('div');
    let rating = document.createElement('div');
    let name = document.createElement('div');
    let cardImg = document.createElement('img');
    cardImg.src = `./imgs/cards/${element.name.split(' ').join('_')}.png`;
    const color = ratingArr[element.rating];
    outercard.classList.add('card', color);
    attribute.classList.add('attribute');
    attribute.style.background = `url(./imgs/elements/${element.attribute.toUpperCase()}.png) 0% 0% / 100% no-repeat`;
    rating.classList.add('rating');
    let charRating = element.rating;
    while (charRating > 0) {
      let star = document.createElement('div');
      star.classList.add('star');
      rating.appendChild(star);
      charRating--;
    }
    name.classList.add('name');
    name.textContent = element.name;
    outercard.append(attribute, cardImg, rating, name);
    box.append(outercard);
  });
};

export default showResult;
