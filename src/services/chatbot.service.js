import { textsHelper } from "../helpers";
import {
  defaultChatbotBackendUrl,
  defaultChatbotComponents,
} from "../helpers/constants";
import { getCurrentLanguage } from "../helpers/getTexts";

const chatBotService = { postQuery, getComponents };
let graphId = undefined;

function handleResponse(response) {
  if (!!response?.ok) {
    graphId = response.headers.get("X-qanary-graph");

    return response.json();
  } else {
    throw new Error("Response was not ok");
  }
}

function postQuery(
  question,
  backendUrl = defaultChatbotBackendUrl,
  componentList = defaultChatbotComponents
) {
  if (!backendUrl) {
    backendUrl = defaultChatbotBackendUrl;
  }
  backendUrl = backendUrl.replace(/\/$/, "");

  const texts = textsHelper.getTexts();
  const previousGraphAddendum =
    graphId != null ? `&priorConversation=${graphId}` : "";

  return fetch(
    `${backendUrl}/gerbil-execute/${componentList.join(
      ","
    )}?query=${encodeURIComponent(
      question
    )}&lang=${getCurrentLanguage()}${previousGraphAddendum}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then(handleResponse)
    .then((questions) => {
      const data = questions.questions[0].answers[0];
      return {
        question: question,
        answer: data,
        followUpNeeded: data["follow_up_needed"] ?? false,
        visualization: data.visualization ?? {},
        loadedSuccessfully: true,
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        question,
        answer: texts["error-messages"]["no-answer-found"],
        visualization: {
          buttons: [
            {
              title: texts["default-responses"]["try-again"],
              payload: question,
            },
          ],
        },
        followUpNeeded: true,
        loadedSuccessfully: false,
      };
    });
}

function getComponents(backendUrl = defaultChatbotBackendUrl) {
  // remove potential trailing slash since it's technically allowed
  backendUrl = backendUrl.replace(/\/$/, "");
  return fetch(`${backendUrl}/applications`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then(handleResponse)
    .then((data) => {
      if (
        !Array.isArray(data) ||
        (Array.isArray(data) &&
          !data.every((component) => component.name != null))
      ) {
        throw new Error("Response data was malformed");
      }
      return data.map((component) => component.name);
    })
    .catch((errorMessage) => {
      console.error(errorMessage);
      return [];
    });
}

export default chatBotService;
