import React from "react";
import { ClickableIcon } from "..";
import "./Message.css";
import account_icon_black from "../share/imgs/account_icon_black.svg";

export default function Message(props) {
  return (
    <div className="messageContainer">
      <ClickableIcon
        alt="Avatar"
        icon={account_icon_black}
        style={{
          width: "100px",
          height: "100px",
          cursor: "initial",
        }}
      />
      <div className="messageDataContainer burgundy">
        <div className="messageText white-text">{props.messageObject.text}</div>

        <div className="messageTimeSent light-pink-text">{props.messageObject.time}</div>
      </div>
    </div>
  );
}
