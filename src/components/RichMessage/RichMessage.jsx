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
        {!!props.messageObject?.visualization?.diagram ? (
          <>
            <Diagram diagramData={props.messageObject.visualization.diagram[0]} id={props.messageObject.visualization.diagram[0].title}/>
            <Button
              text={props.messageObject.visualization.diagram[1].title ?? ""}
              className="light-pink"
              style={{
                minWidth: `${100}px`,
                height: `${35}px`,
              }}
              onClick={
                props.messageObject.visualization.diagram[1].onClick ??
                undefined
              }
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
