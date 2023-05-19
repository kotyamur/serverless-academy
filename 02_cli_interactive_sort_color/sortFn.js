const sortAlphabetically = (answer) => {
  const filteredAnswer = answer.filter((el) => isNaN(el));
  return filteredAnswer.sort((a, b) => a.localeCompare(b));
};
const sortInAscendingOrder = (answer) => {
  const filteredAnswer = answer.filter((el) => !isNaN(el));
  return filteredAnswer.sort((a, b) => a - b);
};
const sortInDescendingOrder = (answer) => {
  const filteredAnswer = answer.filter((el) => !isNaN(el));
  return filteredAnswer.sort((a, b) => b - a);
};
const sortByNumberOfLetters = (answer) => {
  const filteredAnswer = answer.filter((el) => isNaN(el));
  return filteredAnswer.sort((a, b) => a.length - b.length);
};
const filterUniqueWords = (answer) => {
  const filteredAnswer = answer.filter((el) => isNaN(el));
  return filteredAnswer.filter(
    (word, index, array) => array.indexOf(word) === index
  );
};
const filterUniqueValues = (answer) => {
  return answer.filter((word, index, array) => array.indexOf(word) === index);
};

module.exports = {
  sortAlphabetically,
  sortInAscendingOrder,
  sortInDescendingOrder,
  sortByNumberOfLetters,
  filterUniqueWords,
  filterUniqueValues,
};
