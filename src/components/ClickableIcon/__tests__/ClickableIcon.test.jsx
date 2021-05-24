import renderer from "react-test-renderer";
import { act } from "@testing-library/react";
import ReactDOM from "react-dom";
import ClickableIcon from "../ClickableIcon";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<ClickableIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Blackbox tests
// You cannot dispatch events using test renderer, so I need to actually add the element to the DOM 
// and dispatch an actual event. Calling the function directly would oppose the idea of a blackbox.

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("calls the onClick function when clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<ClickableIcon onClick={mockFn} />, container);
  });

  const div = document.querySelector(".clickableIcon");
  div.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(mockFn).toHaveBeenCalledTimes(1);
});

it("does not call the onClick function when not clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<ClickableIcon onClick={mockFn} />, container);
  });

  expect(mockFn).toHaveBeenCalledTimes(0);
});