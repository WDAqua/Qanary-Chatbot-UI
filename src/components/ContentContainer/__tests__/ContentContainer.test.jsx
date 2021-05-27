import renderer from "react-test-renderer";
import { act } from "@testing-library/react";
import ReactDOM from "react-dom";
import ContentContainer from "../ContentContainer";

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<ContentContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with undefined props", () => {
  const tree = renderer.create(<ContentContainer id={undefined} className={undefined} dangerouslySetInnerHTML={undefined} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with null props", () => {
  const tree = renderer.create(<ContentContainer id={null} className={null} dangerouslySetInnerHTML={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with innerhtml text", () => {
  const tree = renderer.create(<ContentContainer dangerouslySetInnerHTML={"inner html"} />).toJSON();
  expect(tree).toMatchSnapshot();
})

it("renders correctly with innerhtml element", () => {
  const tree = renderer.create(<ContentContainer dangerouslySetInnerHTML={"<button>Element</button>"} />).toJSON();
  expect(tree).toMatchSnapshot();
})

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

it("disappears when focus is lost", () => {
  act(() => {
    ReactDOM.render(<ContentContainer id={"test"} />, container);
  });

  const div = document.querySelector("#test");
  div.classList.remove("hidden");
  // elements need to be focused before being blurrable
  div.focus();
  div.blur();
  
  expect(div.classList.contains("hidden")).toBeTruthy();
});

it("does not disappear when focus is maintained", () => {
  act(() => {
    ReactDOM.render(<ContentContainer id={"test"} />, container);
  });

  const div = document.querySelector("#test");
  div.classList.remove("hidden");
  div.focus();

  expect(div.classList.contains("hidden")).toBeFalsy();
});

it("does not disappear when focus is shifted to another valid element", () => {
  act(() => {
    ReactDOM.render(<ContentContainer id={"test"} dangerouslySetInnerHTML={"<button>Test</button>"} />, container);
  });

  const div = document.querySelector("#test");
  const button = document.querySelector("#test > button");
  div.classList.remove("hidden");
  // elements need to be focused before being blurrable
  div.focus();
  button.focus();

  expect(div.classList.contains("hidden")).toBeFalsy();
});