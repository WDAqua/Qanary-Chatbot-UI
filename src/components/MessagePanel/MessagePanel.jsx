import React from "react";
import { Message, RichMessage } from "..";
import "./MessagePanel.css";

export default function MessagePanel(props) {
  return (
    <div tabIndex="-1" id="messagePanel">
      {props.messages.map((message) =>
        !!message.visualization ? (
          <RichMessage
            key={message.text + message.time}
            messageObject={message}
          />
        ) : (
          <Message key={message.text + message.time + document.querySelectorAll(".messageContainer").length} messageObject={message} />
        )
      )}
    </div>
  );
}
