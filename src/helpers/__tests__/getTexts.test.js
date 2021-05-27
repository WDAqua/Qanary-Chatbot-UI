import { textsHelper } from "..";
import config from "../../config.json";

afterEach(() => {
    // change back to default lang
    textsHelper.changeLanguage();
})

it("starts with the default language", () => {
  expect(textsHelper.getCurrentLanguage()).toEqual(config["default-language"]);
});

it("changes the language to a supported one", () => {
  expect(textsHelper.getCurrentLanguage()).toEqual(config["default-language"]);
  textsHelper.changeLanguage("en");
  expect(textsHelper.getCurrentLanguage()).toEqual("en");
});

it("falls back to the default language for unsupported ones", () => {
  expect(textsHelper.getCurrentLanguage()).toEqual(config["default-language"]);
  textsHelper.changeLanguage("fr");
  expect(textsHelper.getCurrentLanguage()).toEqual(config["default-language"]);
});

it("generates unique ids for many listeners", () => {
    let last = textsHelper.addListener(() => null)
    for (let i = 0; i < 10000; i++) {
        const next = textsHelper.addListener(() => null);
        textsHelper.removeListener(next); // This is just for performance reasons
        expect(next).not.toEqual(last);
        last = next;
    }
})

it("calls the listener callback when the language is changed", () => {
    const mockFn = jest.fn();
    expect(textsHelper.getCurrentLanguage()).toEqual(config["default-language"]);
    textsHelper.addListener(mockFn);
    textsHelper.changeLanguage("en");

    expect(mockFn).toHaveBeenCalledTimes(1);
})

it("does not call the listener callback when the language is changed after the listener was removed", () => {
    const mockFn = jest.fn();
    expect(textsHelper.getCurrentLanguage()).toEqual(config["default-language"]);
    const id = textsHelper.addListener(mockFn);
    textsHelper.changeLanguage("en");
    expect(mockFn).toHaveBeenCalledTimes(1);

    textsHelper.removeListener(id);
    textsHelper.changeLanguage();
    expect(mockFn).toHaveBeenCalledTimes(1);
})