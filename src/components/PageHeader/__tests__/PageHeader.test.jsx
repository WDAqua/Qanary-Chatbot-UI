import renderer from "react-test-renderer";
import { act } from "@testing-library/react";
import ReactDOM from "react-dom";
import PageHeader from "../PageHeader";
import { textsHelper } from "../../../helpers"

// Snapshot tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<PageHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Blackbox tests
// You cannot dispatch events using test renderer, so I need to actually add the element to the DOM
// and dispatch an actual event. Calling the function directly would oppose the idea of a blackbox.
// Why not enzyme? Because enzyme doesn't officially support React 17.

// This component isn't as obvious when it comes to testing. There's a lot that could happen and you could write
// a lot of tests. However, only few things are truly original functionality of this component. 
// The language toggle isn't original. It merely utilizes the getTexts module.
// Sending exemplary questions *is* original, but you need to mock the getTexts module to supply test questions first.
// Toggling the ContentContainer components *is* original.

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Imprint ContentContainer is toggled on icon click", () => {
  act(() => {
    ReactDOM.render(<PageHeader />, container);
  });

  const [ imprintIcon, ] = document.querySelectorAll(".clickableIcon");
  const imprintContainer = document.querySelector("#imprint");
  
  expect(imprintContainer.classList.contains("hidden")).toBeTruthy();

  imprintIcon.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(imprintContainer.classList.contains("hidden")).toBeFalsy();

  imprintIcon.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(imprintContainer.classList.contains("hidden")).toBeTruthy();
});

it("Imprint ContentContainer is not toggled on incorrect click", () => {
  act(() => {
    ReactDOM.render(<PageHeader />, container);
  });

  const questionsIcon = document.querySelector(".questionsToggle");
  const imprintContainer = document.querySelector("#imprint");
  
  expect(imprintContainer.classList.contains("hidden")).toBeTruthy();

  questionsIcon.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(imprintContainer.classList.contains("hidden")).toBeTruthy();
});

it("Exemplary questions ContentContainer is toggled on div click", () => {
  act(() => {
    ReactDOM.render(<PageHeader />, container);
  });

  const questionsIcon = document.querySelector(".questionsToggle");
  const questionsContainer = document.querySelector("#exemplaryQuestions");
  
  expect(questionsContainer.classList.contains("hidden")).toBeTruthy();

  questionsIcon.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(questionsContainer.classList.contains("hidden")).toBeFalsy();

  questionsIcon.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(questionsContainer.classList.contains("hidden")).toBeTruthy();
});

it("Exemplary questions ContentContainer is not toggled on incorrect click", () => {
  act(() => {
    ReactDOM.render(<PageHeader />, container);
  });

  const [ imprintIcon, ] = document.querySelectorAll(".clickableIcon");
  const questionsContainer = document.querySelector("#exemplaryQuestions");
  
  expect(questionsContainer.classList.contains("hidden")).toBeTruthy();

  imprintIcon.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(questionsContainer.classList.contains("hidden")).toBeTruthy();
});

it("You can send the exemplary questions as messages", () => {
  // This loads the mock module I created in ../../../helpers/__mocks__/getTexts.js
  jest.mock("../../../helpers/getTexts");
  const mockFn = jest.fn();

  act(() => {
    ReactDOM.render(<PageHeader sendMessage={mockFn} />, container);
  });

  const questionsContainer = document.querySelector("#exemplaryQuestions");
  const sendButton = questionsContainer.querySelector(".exampleQuestion > button");
  const exemplaryQuestion = textsHelper.getTexts()?.["exemplary-questions"]?.[0];
  questionsContainer.classList.toggle("hidden");
  
  sendButton.dispatchEvent(new InputEvent("click", { bubbles: true }));

  expect(mockFn).toHaveBeenCalledWith(exemplaryQuestion);
  // It's VERY important to unmock the module because the other tests rely on it being there
  jest.unmock("../../../helpers/getTexts");
})