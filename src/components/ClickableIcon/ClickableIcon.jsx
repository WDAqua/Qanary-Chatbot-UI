import React, { Component } from "react";
import { textsHelper } from "../../helpers";
import "./ClickableIcon.css";

/**
 *
 * @property {function} onClick The function that gets executed when the button is clicked
 * @property {string} icon The URI of the image that should be used as the icon
 * @property {string} alt The alt text that should be displayed, if the image cannot be loaded
 * @property {object} style The style of the div containing the img element
 */
export default class ClickableIcon extends Component {
  texts = textsHelper.getTexts();

  componentDidMount() {
    const numberOfClickableIcons = document.querySelectorAll(".clickableIcon")
      .length;
    this.listenerId = `clickable-icon-${numberOfClickableIcons}`;
    textsHelper.addListener(this.listenerId, () => {
      console.log("Message input");
      this.texts = textsHelper.getTexts();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    textsHelper.removeListener(this.listenerId);
    delete this.listenerId;
  }

  render() {
    return (
      <div
        className={"clickableIcon " + (this.props.className ?? "")}
        onClick={this.props.onClick ?? undefined}
        style={this.props.style ?? {}}
        tabIndex={this.props.tabIndex ?? "0"}
      >
        <img
          tabIndex="-1"
          src={
            this.props.icon ??
            `https://plchldr.co/i/50x50?&bg=8f8e8e&fc=000&text=${this.texts["clickable-icon"]["fallback-text"]}`
          }
          alt={this.props.alt ?? this.texts["clickable-icon"]["fallback-text"]}
        />
      </div>
    );
  }
}
