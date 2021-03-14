let currentLanguage = require("../config.json")["default-language"];
let texts = require(`../texts/${currentLanguage}/texts.json`);
let listeners = [];

// This is not a typo, this is a generator function
// For more information, see here: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/function*
function* getIdGenerator() {
  let currentId = 0;
  while (true) {
    yield currentId;
    currentId++;
  }
}

const idGenerator = getIdGenerator();

function changeLanguage(newLanguage = "de") {
  if (currentLanguage === newLanguage) return;
  currentLanguage = newLanguage;
  texts = require(`../texts/${currentLanguage}/texts.json`);
  listeners.forEach((listener) => listener.callback());
}

function getCurrentLanguage() {
  return currentLanguage;
}

function getTexts() {
  return texts;
}

function addListener(callback) {
  const id = idGenerator.next().value;
  listeners.push({
    id,
    callback,
  });
  return id;
}

function removeListener(id) {
  const listenerPosition = listeners.indexOf((listener) => listener.id === id);
  listeners.splice(listenerPosition, 1);
}

export { changeLanguage, getTexts, addListener, removeListener, getCurrentLanguage };
