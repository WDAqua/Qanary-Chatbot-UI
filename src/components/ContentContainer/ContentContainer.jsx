import React from "react";
import "./ContentContainer.css";

export default function ContentContainer(props) {
  return (
    <div
      id={props.id ?? ""}
      className={"contentContainer hidden" + (props.className ?? "")}
    >
      {props.children ?? ""}
    </div>
  );
}
