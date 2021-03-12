import React from "react";
import "./InfoContainer.css";

export default function InfoContainer(props) {
  return (
    <div
      id={props.id ?? ""}
      className={"infoContainer hidden" + (props.className ?? "")}
    >
      {props.info ?? ""}
    </div>
  );
}
