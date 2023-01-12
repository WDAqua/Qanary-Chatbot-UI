import { textsHelper } from "../helpers";
import { defaultRasaBackendUrl } from "../helpers/constants";
import { v4 as uuidv4 } from "uuid";

const rasaService = { postQuery };
let sessionId = sessionStorage.getItem("sessionId");

function handleResponse(response) {
  if (!!response?.ok) {
    return response.json();
  } else {
    throw new Error("Response was not ok");
  }
}

function postQuery(question, backendUrl) {
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem("sessionId", sessionId);
  }
  backendUrl ||= defaultRasaBackendUrl;

  backendUrl = backendUrl.replace(/\/$/, "");

  const texts = textsHelper.getTexts();

  return fetch(`${backendUrl}/webhooks/rest/webhook`, {
    body: JSON.stringify({
      sender: sessionId,
      message: question,
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then(handleResponse)
    .then((answers) => {
      const answer = answers.reduce(
        (partialAnswer, { text }) => partialAnswer + text,
        ""
      );

      return {
        question,
        answer,
        followUpNeeded: answer["follow_up_needed"] ?? false,
        visualization: answer.visualization ?? {},
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

export default rasaService;
