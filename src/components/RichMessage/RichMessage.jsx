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
            ? props.messageObject.visualization.buttons.map((button, i) => (
                // i is the shortest unique identifier in this case and the content will not be updated
                <Button
                  text={button.title ?? ""}
                  key={i}
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

        {!!props.messageObject?.visualization?.diagram && props.messageObject.followUpNeeded != null && !props.messageObject.followUpNeeded ? (
          <div tabIndex="-1" className="diagramContainer">
            <Diagram
              diagramData={props.messageObject.visualization.diagram}
              id={`diagram-${document.querySelectorAll(".diagram").length}`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
