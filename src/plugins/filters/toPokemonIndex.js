export default (index) => {
  if (index === undefined || index === '') return '#xxx';
  let output = index.toString();
  while (output.length < 3) {
    output = `0${output}`;
  }
  return `#${output}`;
};
