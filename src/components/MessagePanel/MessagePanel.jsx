import React from "react";
import { Message, RichMessage } from "..";
import "./MessagePanel.css";

export default function MessagePanel(props) {
  return (
    <div id="messagePanel">
      {props.messages.map((message) =>
        !!message.visualization ? (
          <RichMessage
            key={message.text + message.time}
            messageObject={message}
          />
        ) : (
          <Message key={message.text + message.time} messageObject={message} />
        )
      )}
    </div>
  );
}
