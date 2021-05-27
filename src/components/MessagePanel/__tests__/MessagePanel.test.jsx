import renderer from "react-test-renderer";
import MessagePanel from "../MessagePanel";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<MessagePanel />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with one valid message", () => {
  const tree = renderer.create(<MessagePanel messages={[
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test",
      followUpNeeded: false,
      time: "13:37",
    }
  ]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with multiple distinct valid messages", () => {
  const tree = renderer.create(<MessagePanel messages={[
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test",
      followUpNeeded: false,
      time: "13:37",
    },
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test2",
      followUpNeeded: false,
      time: "13:37",
    },
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test3",
      followUpNeeded: false,
      time: "13:37",
    }
  ]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with multiple equal valid messages", () => {
  const tree = renderer.create(<MessagePanel messages={[
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test",
      followUpNeeded: false,
      time: "13:37",
    },
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test",
      followUpNeeded: false,
      time: "13:37",
    },
    {
      isReply: false,
      loadedSuccessfully: true,
      text: "test",
      followUpNeeded: false,
      time: "13:37",
    }
  ]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with just empty object", () => {
  const tree = renderer.create(<MessagePanel messages={[{}]} />).toJSON();
  expect(tree).toMatchSnapshot();
});