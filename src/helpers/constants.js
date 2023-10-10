export const defaultChatbotComponents =
  window._env_?.DEFAULT_CHATBOT_COMPONENTS ?? [];

export const initialQuestionParameter =
  window._env_?.INITIAL_QUESTION_PARAMETER_NAME ?? "question";

export const chatbotFrontendUrl =
  window._env_?.CHATBOT_FRONTEND_URL ?? "http://localhost:3000";

export const defaultChatbotBackendUrl =
  window._env_?.DEFAULT_CHATBOT_BACKEND_URL ?? "http://localhost:8000";

export const defaultChatbotIconUrl =
  window._env_?.DEFAULT_CHATBOT_ICON_URL ?? "";

export const defaultLanguage = window._env_?.DEFAULT_LANGUAGE ?? "de";

export const defaultRasaBackendUrl =
  window._env_?.DEFAULT_RASA_BACKEND_URL ?? "http://localhost:5000";

export const defaultBackendType =
  window._env_?.DEFAULT_BACKEND_TYPE ?? "qanary";
