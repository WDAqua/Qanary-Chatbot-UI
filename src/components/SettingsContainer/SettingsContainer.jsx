import React, { Component } from "react";
import "./SettingsContainer.css";
import { ContentContainer } from "..";
import { textsHelper } from "../../helpers";
import config from "../../config.json";

export default class SettingsContainer extends Component {
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

  moveUp(componentName) {
    const componentsCopy = this.props.components;
    const componentIndex = componentsCopy.findIndex(
      (component) => component.name === componentName
    );
    componentsCopy.splice(
      componentIndex - 1,
      0,
      componentsCopy.splice(componentIndex, 1)[0]
    );

    this.props.setComponents(componentsCopy);
  }

  moveDown(componentName) {
    const componentsCopy = this.props.components;
    const componentIndex = componentsCopy.findIndex(
      (component) => component.name === componentName
    );
    componentsCopy.splice(
      componentIndex + 1,
      0,
      componentsCopy.splice(componentIndex, 1)[0]
    );

    this.props.setComponents(componentsCopy);
  }

  render() {
    return (
      <ContentContainer id="chatbotSettings">
        {this.texts.settings.explanation}
        <div id="urlSettingsContainer">
          <input
            type="text"
            id="backendUrlInput"
            defaultValue={config["default-chatbot-backend-url"]}
          />
          <input
            type="button"
            value={this.texts.settings["confirm-url"]}
            onClick={() => {
              const urlInput = document.getElementById("backendUrlInput");
              const errElement = document.querySelector(
                "#urlSettingsContainer > .errorMessage"
              );
              this.props.setBackendUrl(urlInput.value).catch((errorMessage) => {
                console.error(errorMessage);
                errElement.classList.remove("hidden");
              });
              errElement.classList.add("hidden");
            }}
          />
          <div className="errorMessage hidden">
            {this.texts.settings["url-malformed"]}
          </div>
        </div>
        <div id="componentSettings">
          <div>{this.texts.settings["list-explanation"]}</div>
          {this.props.components?.map((component, i) => (
            <div key={component.name} className="chatbotComponent">
              <span className="componentName">{`${i + 1}. ${component.name}`}</span>
              <input
                type="button"
                value="▲"
                onClick={() => this.moveUp.bind(this, component.name)()}
              />
              <input
                type="button"
                value="▼"
                onClick={() => this.moveDown.bind(this, component.name)()}
              />
              <input type="checkbox" checked={component.activated} onChange={() => this.props.toggleComponent(component)} />
            </div>
          ))}
          <div
            className={
              "errorMessage" +
              (this.props.components?.length > 0 ? " hidden" : "")
            }
          >
            {this.texts.settings["no-components"]}
          </div>
        </div>
      </ContentContainer>
    );
  }
}
