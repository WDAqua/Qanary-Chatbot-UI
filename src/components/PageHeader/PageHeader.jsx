import React, { Component } from "react";
import { Button, ClickableIcon, ContentContainer } from "..";
import { textsHelper } from "../../helpers";
import flag_icon from "../share/imgs/flag_icon.webp";
import info_icon_white from "../share/imgs/info_icon_white.svg";
import "./PageHeader.css";
import config from "../../config.json";

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
        <div tabIndex="-1" id="header">
          <ClickableIcon
            onClick={() => {
              const imprint = document.getElementById("imprint");
              imprint.classList.toggle("hidden");
              imprint.focus();
            }}
            icon={info_icon_white}
            alt={this.texts["page-header"].icons["info-alt"]}
            style={{
              position: "relative",
              maxWidth: "100px",
              maxHeight: "40px",
              top: "calc((100% - 40px) / 2)",
            }}
          />
          <div className="pageTitle" tabIndex="0">
            <a
              href={config["chatbot-frontend-url"]}
              rel="noreferrer"
              target="_self"
              className="center white-text"
            >
              {this.texts["page-header"].title}
            </a>
          </div>
          <div
            className="questionsToggle"
            tabIndex="-1"
            onClick={() => {
              const exemplaryQuestion = document.getElementById(
                "exemplaryQuestions"
              );
              exemplaryQuestion.classList.toggle("hidden");
              exemplaryQuestion.focus();
            }}
          >
            <span className="center white-text">
              {this.texts["options-menu"]["exemplary-questions"]}
            </span>
          </div>
          <ClickableIcon
            onClick={() => {
              if (textsHelper.getCurrentLanguage() === "de") {
                textsHelper.changeLanguage("en");
              } else {
                textsHelper.changeLanguage("de");
              }
            }}
            alt={this.texts["page-header"].icons["change-language-alt"]}
            icon={flag_icon}
            style={{
              position: "relative",
              maxWidth: "100px",
              maxHeight: "40px",
              top: "calc((100% - 40px) / 2)",
            }}
          />
        </div>
        <ContentContainer
          id="imprint"
          dangerouslySetInnerHTML={this.texts.credits}
        />
        <ContentContainer id="exemplaryQuestions">
          {this.texts["exemplary-questions"].map((questionText, i) => (
            // i is the shortest unique identifier in this case and the content will not be updated
            <div key={i} className="exampleQuestion">
              <div>{questionText}</div>
              <Button
                onClick={() => {
                  this.props.sendMessage(questionText);
                  document
                    .getElementById("exemplaryQuestions")
                    .classList.toggle("hidden");
                }}
                text={this.texts["example-questions"]["ask-question"]}
              />
            </div>
          ))}
        </ContentContainer>
      </>
    );
  }
}
