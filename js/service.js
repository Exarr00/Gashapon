const getChar = async () => {
  return fetch("./characters.json").then((res) => res.json());
};

const getStandardChar = async () => {
  return fetch("./standard.json").then((res) => res.json());
};

export default { getChar, getStandardChar };
