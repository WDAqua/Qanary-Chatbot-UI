import renderer from "react-test-renderer";
import { act } from "@testing-library/react";
import ReactDOM from "react-dom";
import ClickableIcon from "../ClickableIcon";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<ClickableIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with undefined props", () => {
  const tree = renderer.create(<ClickableIcon icon={undefined} alt={undefined} style={undefined} onClick={undefined} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with null props", () => {
  const tree = renderer.create(<ClickableIcon icon={null} alt={null} style={null} onClick={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with invalid icon and no alt", () => {
  const tree = renderer.create(<ClickableIcon icon={"invalid"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with invalid icon and alt", () => {
  const tree = renderer.create(<ClickableIcon icon={"invalid"} alt={"Invalid image"} />).toJSON();
  expect(tree).toMatchSnapshot();
})

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

it("calls the onClick function when div is clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<ClickableIcon onClick={mockFn} />, container);
  });

  const div = document.querySelector(".clickableIcon");
  div.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(mockFn).toHaveBeenCalledTimes(1);
});


// This should be possible due to event bubbling https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing
it("calls the onClick function when img is clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<ClickableIcon onClick={mockFn} />, container);
  });

  const img = document.querySelector(".clickableIcon > img");
  img.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(mockFn).toHaveBeenCalledTimes(1);
});

it("does not call the onClick function when not clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<ClickableIcon onClick={mockFn} />, container);
  });

  expect(mockFn).toHaveBeenCalledTimes(0);
});