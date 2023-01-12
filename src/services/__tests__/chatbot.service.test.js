import chatBotService from "../chatbot.service";
import texts from "../../texts/de/texts.json";
import { defaultChatbotBackendUrl } from "../../helpers/constants";

// Unit tests

it("sends a valid post request", async () => {
  const mockFn = (window.fetch = jest.fn(() => {
    return Promise.resolve({ ok: true, json: () => ({}) });
  }));

  await chatBotService.postQuery("test");

  const requestBody = {
    question: "test",
  };

  expect(mockFn).toHaveBeenCalledWith(defaultChatbotBackendUrl, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

it("handles a failed request appropriately", async () => {
  window.fetch = jest.fn(() => {
    return Promise.reject("I'm intentional. Ignore me.");
  });

  const result = await chatBotService.postQuery("test");

  expect(result).toEqual({
    question: "test",
    answer: texts["error-messages"]["no-answer-found"],
    visualization: {
      buttons: [
        {
          title: texts["default-responses"]["try-again"],
          payload: "test",
        },
      ],
    },
    followUpNeeded: true,
    loadedSuccessfully: false,
  });
});
