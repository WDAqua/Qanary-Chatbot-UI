import React from "react";
import texts from "../../texts/de/texts.json";
import "./ClickableIcon.css";

/**
 * 
 * @property {function} onClick The function that gets executed when the button is clicked
 * @property {string} icon The URI of the image that should be used as the icon
 * @property {string} alt The alt text that should be displayed, if the image cannot be loaded
 * @property {object} style The style of the div containing the img element
 */
export default function ClickableIcon(props) {
  return (
    <div
      className={"clickableIcon " + (props.className ?? "")}
      onClick={props.onClick ?? undefined}
      style={props.style ?? {}}
      tabIndex={props.tabIndex ?? "0"}
    >
      <img
        tabIndex="-1"
        src={props.icon ?? `https://plchldr.co/i/50x50?&bg=8f8e8e&fc=000&text=${texts["clickable-icon"]["fallback-text"]}`}
        alt={props.alt ?? texts["clickable-icon"]["fallback-text"]}
      />
    </div>
  );
}
