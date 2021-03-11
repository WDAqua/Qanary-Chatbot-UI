import React from "react";
import { Button, Message } from "..";
import "./RichMessage.css";

export default function RichMessage(props) {
  return (
    <div>
      <Message messageObject={props.messageObject} />
      <div className="richContentContainer">
        {!!props.messageObject?.visualization?.buttons
          ? props.messageObject.visualization.buttons.map((button) => (
              <Button
                text={button.text}
                className="light-pink"
                style={{
                  width: `${100}px`,
                  height: `${35}px`,
                }}
                onClick={button.onClick}
              />
            ))
          : null}
      </div>
    </div>
  );
}
