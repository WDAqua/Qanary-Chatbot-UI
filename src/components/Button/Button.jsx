import React from "react";
import "./Button.css";

/**
 *
 * @property {string} className A string containing all complementary classes. This will not replace the button's classes, it will only add to them.
 * @property {object} style An object containing the "inline" style of the object
 * @property {function} onClick The function that should be called when the button is clicked
 * @property {string} text The text inside of the button
 */
export default function Button(props) {
  return (
    <button
      className={"button " + (props.className ?? "")}
      style={props.style ?? {}}
      onClick={props.onClick ?? undefined}
    >
      {props.text ?? ""}
    </button>
  );
}
