import renderer from "react-test-renderer";
import { act } from "@testing-library/react";
import ReactDOM from "react-dom";
import Button from "../Button";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with only text", () => {
  const tree = renderer.create(<Button text="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with inline style", () => {
  const tree = renderer.create(<Button style={{ color: "red" }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with only undefined props", () => {
  const tree = renderer
    .create(
      <Button
        text={undefined}
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with only null props", () => {
  const tree = renderer
    .create(<Button text={null} className={null} style={null} onClick={null} />)
    .toJSON();
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

it("calls the onClick function when clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<Button onClick={mockFn} />, container);
  });

  const btn = document.querySelector("button");
  btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(mockFn).toHaveBeenCalledTimes(1);
});

it("does not call the onClick function when not clicked", () => {
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<Button onClick={mockFn} />, container);
  });

  expect(mockFn).toHaveBeenCalledTimes(0);
});
