const local = {};

local.get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return {};
  }
};

local.set = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export default local;
