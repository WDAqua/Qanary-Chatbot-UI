// This is not a typo, this is a generator function
// For more information, see here: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/function*
function* getIdGenerator() {
  let currentId = 0;
  while (true) {
    yield currentId;
    currentId++;
  }
}

export default getIdGenerator;
