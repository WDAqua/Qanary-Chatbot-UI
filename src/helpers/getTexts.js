let currentLanguage = require("../config.json")["default-language"];
let texts = require(`../texts/${currentLanguage}/texts.json`);
let listeners = [];

function changeLanguage(newLanguage = "de") {
  if (currentLanguage === newLanguage) return;
  currentLanguage = newLanguage;
  texts = require(`../texts/${currentLanguage}/texts.json`);
  listeners.forEach((listener) => listener.callback());
}

function getTexts() {
  return texts;
}

function addListener(id, callback) {
    listeners.push({
        id,
        callback
    })
}

function removeListener(id) {
    const listenerPosition = listeners.indexOf((listener) => listener.id === id);
    listeners.splice(listenerPosition, 1);
}

export { changeLanguage, getTexts, addListener, removeListener };
