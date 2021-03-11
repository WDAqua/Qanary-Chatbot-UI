import React from "react";
import { ClickableIcon } from "..";
import "./Message.css";
import account_icon_black from "../share/imgs/account_icon_black.svg";

export default function Message(props) {
  return (
    <div className={"messageContainer" + (!!props.messageObject?.isReply ? " reply" : "")}>
      <ClickableIcon
        alt="Avatar"
        icon={props.messageObject?.icon ?? account_icon_black}
        style={{
          width: "100px",
          height: "100px",
          cursor: "initial",
        }}
      />
      <div className={"messageDataContainer" + (!!props.messageObject?.isReply ? " burgundy" : "")}>
        <div className={"messageText" + (!!props.messageObject?.isReply ? " white-text" : " black-text")}>{props.messageObject?.text ?? ""}</div>
        {(!props.messageObject?.follow_up_needed && !!props.messageObject?.isReply && !!props.messageObject?.loadedSuccessfully) ? <div className={"messageText" + (!!props.messageObject?.isReply ? " white-text" : " black-text")} > Datenquelle: <a href="https://experience.arcgis.com/experience/478220a4c454480e823b17327b2bf1d4/page/page_0/" rel="noreferrer" target="_blank">Robert Koch-Institut</a> </div> : null}
        <div className="messageTimeSent light-pink-text">{props.messageObject?.time}</div>
      </div>
    </div>
  );
}
