import React, { Component } from "react";
import { ClickableIcon } from "..";
import { textsHelper } from "../../helpers";
import german_flag_icon from "../share/imgs/german_flag_icon.webp";
import english_flag_icon from "../share/imgs/english_flag_icon.webp";
import "./OptionsMenu.css";

export default class OptionsMenu extends Component {
  texts = textsHelper.getTexts();

  componentDidMount() {
    this.listenerId = textsHelper.addListener(() => {
      this.texts = textsHelper.getTexts();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    textsHelper.removeListener(this.listenerId);
  }

  render() {
    return (
      <div id="optionsMenu" className="right-side hidden" tabIndex="-1">
        <ClickableIcon
          onClick={() => textsHelper.changeLanguage("de")}
          className="option"
          alt="Deutsch"
          icon={german_flag_icon}
          style={{
            width: "100px",
            height: "60px",
          }}
        />
        <ClickableIcon
          onClick={() => textsHelper.changeLanguage("en")}
          className="option"
          alt="English"
          icon={english_flag_icon}
          style={{
            width: "100px",
            height: "60px",
          }}
        />
        <div
          className="option"
          tabIndex="0"
          onClick={() => {
            document
              .getElementById("exemplaryQuestions")
              .classList.toggle("hidden");
          }}
        >
          {this.texts["options-menu"]["exemplary-questions"]}
        </div>
      </div>
    );
  }
}
