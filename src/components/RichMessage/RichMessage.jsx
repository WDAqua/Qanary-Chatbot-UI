import React from "react";
import { Button, Diagram, Message } from "..";
import "./RichMessage.css";

export default function RichMessage(props) {
  return (
    <div tabIndex="-1">
      <Message messageObject={props.messageObject} />
      <div tabIndex="-1" className="richContentContainer">
        <div tabIndex="-1" className="buttonsContainer">
          {!!props.messageObject?.visualization?.buttons
            ? props.messageObject.visualization.buttons.map((button) => (
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
              ))
            : null}
        </div>

        <div tabIndex="-1" className="diagramContainer">
          {!!props.messageObject?.visualization?.diagram
            ? props.messageObject.visualization.diagram.map((diagram) => (
                <Diagram
                  key={diagram.title}
                  diagramData={diagram}
                  id={`diagram-${document.querySelectorAll(".diagram").length}`}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
