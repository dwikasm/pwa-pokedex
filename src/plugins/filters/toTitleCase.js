export default (str) => {
  if (str === undefined || str === '') return '';
  str = str.toLowerCase().split(' ');
  const final = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const word of str) {
    final.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return final.join(' ');
};
