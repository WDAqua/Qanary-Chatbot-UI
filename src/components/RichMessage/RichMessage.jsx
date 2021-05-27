import React from "react";
import { Button, Message } from "..";
import "./RichMessage.css";

/**
 * @typedef {object} RichMessage
 *   @property {boolean} isReply determines whether it's a bot or user message (left or right side, colour scheme, etc.)
 *   @property {boolean} loadedSuccessfully determines if source disclaimer gets displayed or not
 *   @property {boolean} followUpNeeded determines if extra buttons are displayed
 *   @property {string} time The time the message was sent
 *   @property {string} icon The image next to the message
 *   @property {string} text The message's contents
 *   @property {object} visualization data on how the visualizations, i. e. buttons, look
 *
 * @description A rich content variant of the message component, supporting feedback through buttons
 *
 * @property {RichMessage} messageObject
 */
export default function RichMessage(props) {
  const buttonElements = !!props.messageObject?.visualization?.buttons?.map
    ? props.messageObject.visualization.buttons.map((button, i) => (
        // i is the shortest unique identifier in this case and the content will not be updated
        <Button
          text={button.title ?? ""}
          key={i}
          style={{
            minWidth: `${100}px`,
            height: `${35}px`,
          }}
          onClick={button.onClick ?? undefined}
        />
      ))
    : null;

  return (
    <div tabIndex="-1">
      <Message messageObject={props.messageObject} />
      <div tabIndex="-1" className="richContentContainer">
        <div tabIndex="-1" className="buttonsContainer">
          {buttonElements}
        </div>
      </div>
    </div>
  );
}
