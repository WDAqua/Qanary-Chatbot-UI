import React, { Component } from "react";
import { Message, RichMessage } from "..";
import "./MessagePanel.css";

export default class MessagePanel extends Component {
  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      const messagePanel = document.getElementById("messagePanel");
      messagePanel.scrollTop += messagePanel.scrollHeight;
    });
  }

  render() {
    return (
      <div tabIndex="-1" id="messagePanel">
        {this.props.messages.map((message, i) =>
          // i is the shortest unique identifier in this case and the content will not be shuffled, so i is constant
          !!message.visualization ? (
            <RichMessage key={i} messageObject={message} />
          ) : (
            <Message key={i} messageObject={message} />
          )
        )}
      </div>
    );
  }
}
