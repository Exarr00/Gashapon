const getChar = () => {
  return fetch("./characters.json").then((res) => res.json());
};

const standardChar = () => {};

export default getChar;
