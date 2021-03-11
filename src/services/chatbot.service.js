import config from "../config.json";
import texts from "../texts/de/texts.json";

const chatBotService = { postQuery };
let graphId = undefined;

function postQuery(question) {
  const requestBody = {
    question,
    graphid: graphId ?? ""
  };
  console.log(requestBody);
  return fetch(config["chatbot-backend-url"], {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
        'Content-Type': "application/json"
    }
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
        followUpNeeded: data['follow-up-needed'] ?? false,
        visualization: data.visualization,
        loadedSuccessfully: true,
      };
    }).catch((err) => {
        return {
            question,
            answer: texts["error-messages"]["no-answer-found"],
            visualization: {
              buttons: [
                {
                  text: texts["default-responses"]["try-again"],
                  value: question,
                },
              ],
            },
            followUpNeeded: true,
            loadedSuccessfully: false,
        }
    })
}

export default chatBotService;