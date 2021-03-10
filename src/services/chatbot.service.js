import config from "../config.json";
import texts from "../texts/de/texts.json";

const chatBotService = { postQuery };
let graphId = undefined;

function postQuery(question) {
  const requestBody = {
    question,
  };
  // This is to prevent the requestBody object from having a graphid field, if there is no graphId yet.
  if (!!graphId) requestBody.graphid = graphId;
  return fetch(config["chatbot-backend-url"], {
    method: "POST",
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!!response?.ok) {
        return response.json();
      }
    })
    .then((data) => {
      graphId = data?.graphid;
      return {
        question: data.question,
        answer: data.answer ?? texts["error-messages"]["no-answer-found"],
      };
    }).catch((err) => {
        return {
            question,
            answer: texts["error-messages"]["no-answer-found"],
        }
    })
}

export default chatBotService;
