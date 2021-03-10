import React, { Component } from "react";
import { Button } from "..";
import "./MessageInput.css";
import texts from '../../texts/de/texts.json';

export default class MessageInput extends Component {
  render() {
    return (
      <div id="messageInput">
        <textarea id="inputTextBox" placeholder={texts["message-input"]["placeholder-text"]} />
        <div id="submitButtonContainer">
          <Button
            text={texts["message-input"]["submit-button"]}
            style={{
              width: "150px",
              height: "50px",
              marginRight: "30px",
            }}
            className={"light-red vertical-center right-side"}
          />
        </div>
      </div>
    );
  }
}
