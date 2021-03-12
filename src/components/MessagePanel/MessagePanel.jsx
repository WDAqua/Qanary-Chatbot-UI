import React from "react";
import { Message, RichMessage } from "..";
import "./MessagePanel.css";

export default function MessagePanel(props) {
  return (
    <div tabIndex="-1" id="messagePanel">
      {props.messages.map((message, i) =>
        // i is the shortest unique identifier in this case and the content will not be shuffled, so i is constant
        !!message.visualization ? (
          <RichMessage
            key={i}
            messageObject={message}
          />
        ) : (
          <Message key={i} messageObject={message} />
        )
      )}
    </div>
  );
}
