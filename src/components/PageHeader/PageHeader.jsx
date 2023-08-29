import React, { Component } from "react";
import {
  ClickableIcon,
  QuestionsContainer,
  SettingsContainer,
  ImprintContainer,
} from "..";
import { textsHelper } from "../../helpers";
import flag_icon from "../share/imgs/flag_icon.webp";
import settings_icon_black from "../share/imgs/settings_icon_black.svg";
import settings_icon_white from "../share/imgs/settings_icon_white.svg";
import info_icon_black from "../share/imgs/info_icon_black.svg";
import info_icon_white from "../share/imgs/info_icon_white.svg";
import "./PageHeader.css";
import { chatbotFrontendUrl } from "../../helpers/constants";

function toggleContainer(containerId) {
  const container = document.getElementById(containerId);

  // get all containers and remove self
  let others = Array.from(document.getElementsByClassName("contentContainer"));
  const ownIndex = others.findIndex((element) => element === container);
  others.splice(ownIndex, 1);

  // Hide all other containers
  others.forEach((other) => {
    if (!other.classList.contains("hidden")) {
      other.classList.add("hidden");
    }
  });

  // Show self and set focus for blur event
  container.classList.toggle("hidden");
  if (container.classList.contains("hidden")) {
    container.focus();
  }
}

/**
 * @description This is the header of the page containing the title and various buttons
 *
 * @property {function} sendMessage The same function that's used in the MessageInput to send examplary questions
 * @property {function} setComponents
 * @property {function} setBackendUrl
 * @property {array} components
 * @property {string} backendUrl
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
            onClick={() => toggleContainer("imprint")}
            icon={
              this.props.currentTheme === "default"
                ? info_icon_white
                : info_icon_black
            }
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
              href={chatbotFrontendUrl}
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
            onClick={() => toggleContainer("exemplaryQuestions")}
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
          <ClickableIcon
            onClick={() => toggleContainer("chatbotSettings")}
            alt={this.texts["page-header"].icons["change-language-alt"]}
            icon={
              this.props.currentTheme === "default"
                ? settings_icon_white
                : settings_icon_black
            }
            style={{
              position: "relative",
              maxWidth: "100px",
              maxHeight: "40px",
              top: "calc((100% - 40px) / 2)",
            }}
          />
        </div>
        <ImprintContainer />
        <QuestionsContainer sendMessage={this.props.sendMessage} />
        <SettingsContainer
          components={this.props.components}
          backendUrl={this.props.backendUrl}
          backendType={this.props.backendType}
          currentTheme={this.props.currentTheme}
          setComponents={this.props.setComponents}
          setBackendUrl={this.props.setBackendUrl}
          setBackendType={this.props.setBackendType}
          setTheme={this.props.setTheme}
          // toggleComponent={this.props.toggleComponent} // TODO: Add back in once we move on from the MVP
        />
      </>
    );
  }
}
