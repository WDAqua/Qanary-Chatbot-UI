import React, { Component } from "react";
import "./SettingsContainer.css";
import { ContentContainer } from "..";
import { textsHelper } from "../../helpers";
import { SpringBootHealthCheck } from "@qanary/spring-boot-health-check";
import { defaultChatbotBackendUrl } from "../../helpers/constants";
import { supportedServiceNames } from "../../services";

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

  /*
  TODO: Edit back in once we move on from the MVP
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
  */

  render() {
    return (
      <ContentContainer id="chatbotSettings">
        {this.texts.settings.explanation}
        <SpringBootHealthCheck
          springBootAppUrl={this.props.backendUrl || defaultChatbotBackendUrl}
        />
        <div id="urlSettingsContainer">
          <input
            type="text"
            id="backendUrlInput"
            defaultValue={this.props.backendUrl || defaultChatbotBackendUrl}
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
          <div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`${
                this.props.backendUrl.replace(/\/$/, "") ||
                defaultChatbotBackendUrl
              }/#/applications`}
            >
              {this.texts.settings["admin-panel-url"] +
                " " +
                this.props.backendUrl}
            </a>
          </div>
        </div>
        <div id="componentSettingsContainer">
          <div>{this.texts.settings["components-explanation"]}</div>
          <input
            type="text"
            id="componentsList"
            defaultValue={this.props.components.join(",")}
          />
          <input
            type="button"
            value={this.texts.settings["confirm-components"]}
            onClick={() => {
              const componentsInput = document.getElementById("componentsList");
              const errElement = document.querySelector(
                "#componentSettingsContainer > .errorMessage"
              );
              try {
                this.props.setComponents(
                  componentsInput.value.replace(/\s/g, "").split(",")
                );
              } catch (errorMessage) {
                console.error(errorMessage);
                errElement.classList.remove("hidden");
              }
              errElement.classList.add("hidden");
            }}
          />
          <div
            className={
              "errorMessage" +
              (this.props.components?.length > 0 ? " hidden" : "")
            }
          >
            {this.texts.settings["no-components"]}
          </div>
          {this.texts.settings["select-service-type"]}
          <select
            onChange={(changeEvent) => {
              this.props.setBackendType(changeEvent.target.value);
            }}
          >
            {supportedServiceNames.map((name) => (
              <option key={name} selected={name === this.props.backendType}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </ContentContainer>
    );
  }
}

/*

TODO: This is for dynamic loading of the components. Instead, we'll use an input element as an MVP for now
component.
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



          German text for explanation: "Stellen Sie hier die Reihenfolge der Komponenten ein und markieren Sie die Komponenten, die Sie nutzen möchten. Die Reihenfolge ist wichtig und muss korrekt angegeben werden."
          English text for explanation: "Set the order of the components here and choose which to use. The order is important and has to be set correctly."
*/
