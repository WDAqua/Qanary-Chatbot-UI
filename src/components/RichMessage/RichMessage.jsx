import React from "react";
import { Button, Diagram, Message } from "..";
import "./RichMessage.css";

export default function RichMessage(props) {
  return (
    <div>
      <Message messageObject={props.messageObject} />
      <div className="richContentContainer">
        {!!props.messageObject?.visualization?.buttons
          ? props.messageObject.visualization.buttons.map((button) => (
              <div className="buttonsContainer">
                <Button
                  text={button.title ?? ""}
                  key={button.title + button.payload}
                  className="light-pink"
                  style={{
                    minWidth: `${100}px`,
                    height: `${35}px`,
                  }}
                  onClick={button.onClick ?? undefined}
                />
              </div>
            ))
          : null}
        {!!props.messageObject?.visualization?.diagram
          ? props.messageObject.visualization.diagram.map((diagram) => (
              <div className="diagramContainer">
                <Diagram
                  key={diagram.title}
                  diagramData={diagram}
                  id={diagram.title}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
