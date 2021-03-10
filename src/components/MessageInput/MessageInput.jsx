import React, { Component } from "react";
import { Button } from "..";
import "./MessageInput.css";
import texts from "../../texts/de/texts.json";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSending: false,
      query: "",
    };

    this.onSendMessage = this.onSendMessage.bind(this);
    this.inputTextChange = this.inputTextChange.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
  }

  onSendMessage() {
    this.props.sendMessage(this.state.query);
    this.setState({ isSending: true, query: "" });
  }

  inputTextChange(changeEvent) {
    this.setState({ query: changeEvent.target.value });
  }

  inputKeyPress(keyPressEvent) {
    if (keyPressEvent.key === "Enter") {
      this.onSendMessage();
    }
  }

  render() {
    return (
      <>
        <div
          id="loadingBar"
          className={this.state.isSending ? "visible" : ""}
        />
        <div id="messageInput">
          <textarea
            id="inputTextBox"
            placeholder={texts["message-input"]["placeholder-text"]}
            value={this.state.query}
            onChange={this.inputTextChange}
            onKeyPress={this.inputKeyPress}
          />
          <div id="submitButtonContainer">
            <Button
              text={texts["message-input"]["submit-button"]}
              onClick={this.onSendMessage}
              style={{
                width: "150px",
                height: "50px",
                marginRight: "30px",
              }}
              className={"light-pink vertical-center right-side"}
            />
          </div>
        </div>
      </>
    );
  }
}
