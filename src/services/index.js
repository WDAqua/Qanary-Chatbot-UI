import chatBotService from "./chatbot.service";
import rasaService from "./rasa.service";

export const supportedServices = {
  rasa: rasaService,
  qanary: chatBotService,
};

export const supportedServiceNames = Object.keys(supportedServices).filter(
  (name) => Object.prototype.hasOwnProperty.call(supportedServices, name)
);

export const supportedThemes = ["default", "itzbund"];
