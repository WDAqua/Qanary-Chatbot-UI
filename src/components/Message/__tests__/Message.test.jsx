import renderer from "react-test-renderer";
import Message from "../Message";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<Message />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with valid reply message object, including disclaimer", () => {
  const tree = renderer.create(<Message messageObject={{
    isReply: true,
    loadedSuccessfully: true,
    followUpNeeded: false,
    time: "13:37",
  }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with valid user message object, without disclaimer", () => {
  const tree = renderer.create(<Message messageObject={{
    isReply: false,
    loadedSuccessfully: true,
    followUpNeeded: false,
    time: "13:37",
  }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with undefined message object properties", () => {
  const tree = renderer.create(<Message messageObject={{
    isReply: undefined,
    loadedSuccessfully: undefined,
    followUpNeeded: undefined,
    time: undefined,
    icon: undefined,
  }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with invalid icon as reply", () => {
  const tree = renderer.create(<Message messageObject={{
    isReply: true,
    loadedSuccessfully: true,
    followUpNeeded: false,
    time: "13:37",
    icon: "invalid",
  }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with invalid icon as user message", () => {
  const tree = renderer.create(<Message messageObject={{
    isReply: false,
    loadedSuccessfully: true,
    followUpNeeded: false,
    time: "13:37",
    icon: "invalid",
  }} />).toJSON();
  expect(tree).toMatchSnapshot();
});