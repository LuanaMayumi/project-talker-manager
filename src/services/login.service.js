const createToken = () => {
  const num = Math.random();
  const string = num.toString();
  const token = string.slice(-16);
  return token;
};

module.exports = createToken;