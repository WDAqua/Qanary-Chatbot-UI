import React from "react";
import { Message } from "..";
import "./MessagePanel.css";

export default function MessagePanel(props) {
  return (
    <div id="messagePanel">
      {props.messages.map((message) => (
        <Message key={message.text + message.time} messageObject={message} />
      ))}
    </div>
  );
}
