import React, { Component } from "react";
import { Button, ClickableIcon, ContentContainer } from "..";
import { textsHelper } from "../../helpers";
import german_flag_icon from "../share/imgs/german_flag_icon.webp";
import english_flag_icon from "../share/imgs/english_flag_icon.webp";
import info_icon_white from "../share/imgs/info_icon_white.svg";
import "./PageHeader.css";
//import info_icon_black from '../share/imgs/info_icon_black.svg'
//import more_icon_black from '../share/imgs/more_icon_black.svg'

/**
 * @name PageHeader
 *
 * @description This is the header of the page containing the title and various buttons
 *
 */
export default class PageHeader extends Component {
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
      <>
        <div tabIndex="-1" id="header" className="burgundy">
          <ClickableIcon
            onClick={() => {
              document.getElementById("imprint").classList.toggle("hidden");
            }}
            icon={info_icon_white}
            alt={"Info"}
            style={{
              float: "left",
              height: "100%",
              width: "60px",
            }}
          />
          <ClickableIcon
            onClick={() => textsHelper.changeLanguage("de")}
            className="option"
            alt="Deutsch"
            icon={german_flag_icon}
            style={{
              float: "right",
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
              float: "right",
              width: "100px",
              height: "60px",
            }}
          />
          <div
            className="questionsToggle"
            tabIndex="0"
            onClick={() => {
              document
                .getElementById("exemplaryQuestions")
                .classList.toggle("hidden");
            }}
            style={{
              float: "right",
            }}
          >
            <span className="center white-text">
              {this.texts["options-menu"]["exemplary-questions"]}
            </span>
          </div>
        </div>
        <ContentContainer id="imprint">This is an imprint</ContentContainer>
        <ContentContainer id="exemplaryQuestions">
          {this.texts["exemplary-questions"].map((questionText) => (
            <div key={questionText} className="exampleQuestion">
              {questionText}
              <Button
                onClick={() => this.props.sendMessage(questionText)}
                text={this.texts["example-questions"]["ask-question"]}
              />
            </div>
          ))}
        </ContentContainer>
      </>
    );
  }
}
