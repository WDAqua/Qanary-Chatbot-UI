import renderer from "react-test-renderer";
import { act } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import ReactDOM from "react-dom";
import MessageInput from "../MessageInput";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<MessageInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with loading bar", () => {
  const tree = renderer.create(<MessageInput isSending={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly without loading bar", () => {
  const tree = renderer.create(<MessageInput isSending={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Blackbox tests
// You cannot dispatch events using test renderer, so I need to actually add the element to the DOM
// and dispatch an actual event. Calling the function directly would oppose the idea of a blackbox.
// Why not enzyme? Because enzyme doesn't officially support React 17.

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("sendMessage function is called on click with valid query", async () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<MessageInput sendMessage={mockFn} />, container);
  });

  const textarea = document.querySelector("#messageInput > textarea");
  const button = document.querySelector("#submitButtonContainer > button");
  userEvent.type(textarea, "test");
  
  button.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(mockFn).toHaveBeenCalledWith("test");
});

it("sendMessage function isn't called on click with empty query", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<MessageInput sendMessage={mockFn} />, container);
  });

  const button = document.querySelector("#submitButtonContainer > button");
  button.click();

  expect(mockFn).toBeCalledTimes(0);
});
