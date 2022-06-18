const getChar = () => {
  return fetch('./characters.json').then((res) => res.json());
};

export default getChar;
