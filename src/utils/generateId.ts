// dec2hex :: Integer -> String
const dec2hex = (dec) => ('0' + dec.toString(16)).substr(-2);

// generateId :: Integer -> String
const generateId = (len = 40) => {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
};

export { generateId };
