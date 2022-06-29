const getChar = (banner) => {
  return fetch(banner).then((res) => res.json());
};

export default { getChar};
