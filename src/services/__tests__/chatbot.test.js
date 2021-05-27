import chatBotService from "../chatbot.service";
import config from "../../config.json";
import texts from "../../texts/de/texts.json";

// Unit tests

it("sends a valid post request", async () => {
  const mockFn = (window.fetch = jest.fn(() => {
    return Promise.resolve({ ok: true, json: () => ({}) });
  }));

  await chatBotService.postQuery("test");

  const requestBody = {
    question: "test",
    graph_id: "",
  };

  expect(mockFn).toHaveBeenCalledWith(config["chatbot-backend-url"], {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

it("handles a failed request appropriately", async () => {
  const mockFn = (window.fetch = jest.fn(() => {
    return Promise.reject("I'm intentional. Ignore me.");
  }));

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

it("remembers graph_ids between requests", async () => {
  const mockFn = (window.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () => ({
        follow_up_needed: true,
        graph_id: "test",
      }),
    });
  }));

  await chatBotService.postQuery("test");
  const firstRequestBody = {
    question: "test",
    graph_id: "",
  };
  expect(mockFn).toHaveBeenCalledWith(config["chatbot-backend-url"], {
    method: "POST",
    body: JSON.stringify(firstRequestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  await chatBotService.postQuery("test2");

  expect(mockFn).toHaveBeenCalledTimes(2);
  const secondRequestBody = {
    question: "test2",
    graph_id: "test",
  };

  expect(mockFn).toHaveBeenLastCalledWith(config["chatbot-backend-url"], {
    method: "POST",
    body: JSON.stringify(secondRequestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
});
