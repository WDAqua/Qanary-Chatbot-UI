import config from "../config.json";
import texts from "../texts/de/texts.json";

const chatBotService = { postQuery };
let graphId = undefined;

function postQuery(question) {
  const requestBody = {
    question,
    graph_id: graphId ?? "",
  };
  console.log(requestBody);
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
              "x-axis": "[1,2,3,4,5]",
              "y-axis": "[10,20,30,40,50,60]",
              data_points: ["(1,10)", "(2,17)", "(3,42)", "(4,28)"],
            },
          ],
        },
        followUpNeeded: true,
        loadedSuccessfully: false,
      };
    });
}

export default chatBotService;
