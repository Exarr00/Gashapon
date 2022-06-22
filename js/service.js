const getChar = () => {
  return fetch('./characters.json').then((res) => res.json());
};

const getStandardChar = () => {
  return fetch('./standard.json').then((res) => res.json());
};

export default { getChar, getStandardChar };
