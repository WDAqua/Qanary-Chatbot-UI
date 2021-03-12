import config from "../config.json";
import { textsHelper } from "../helpers";

const chatBotService = { postQuery };
let graphId = undefined;

function postQuery(question) {
  const requestBody = {
    question,
    graph_id: graphId ?? "",
  };
  const texts = textsHelper.getTexts();

  return fetch(config["chatbot-backend-url"], {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!!response?.ok) {
        return response.json();
      }
    })
    .then((data) => {
      graphId = data?.graph_id;
      return {
        question: data.question,
        answer: data.answer ?? texts["error-messages"]["no-answer-found"],
        followUpNeeded: data["follow-up-needed"] ?? false,
        visualization: data.visualization,
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
          diagram: [
            {
              title: "Very serious diagram",
              data_points: ["(2021-01-01,1)", "(2021-02-01,2)", "(2021-03-01,3)", "(2021-04-01,4)"],
            },
          ],
        },
        followUpNeeded: true,
        loadedSuccessfully: false,
      };
    });
}

export default chatBotService;
