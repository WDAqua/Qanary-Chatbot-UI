import renderer from "react-test-renderer";
import App from "../App.js";
import chatBotService from "../../../services/chatbot.service.js";

// Snapshot tests
jest.mock("../../../services/chatbot.service.js");

it("renders App correctly", () => {
  // This is important to always have the same date when creating a new snapshot
  const oldNow = Date.now;
  Date.now = () => new Date(0);
  const tree = renderer.create(<App />).toJSON();
  Date.now = oldNow;
  expect(tree).toMatchSnapshot();
});

// Unit tests
// The only thing we can reasonably test is the sending of the message.

it("sends a message", () => {
  // Components are classes/functions, so we can use this to test methods directly
  // React will complain, but we don't care.
  const app = new App();

  app.sendMessage("test");
  expect(chatBotService.postQuery).toHaveBeenCalledWith("test");
  jest.unmock("../../../services/chatbot.service.js");
})