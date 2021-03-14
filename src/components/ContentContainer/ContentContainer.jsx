import React from "react";
import "./ContentContainer.css";

export default function ContentContainer(props) {
  return (
    <div
      id={props.id ?? ""}
      className={"contentContainer hidden" + (props.className ?? "")}
      dangerouslySetInnerHTML={!!props.dangerouslySetInnerHTML ? {
        __html: (props.dangerouslySetInnerHTML),
      } : undefined}
    >
      {props.children ?? undefined}
    </div>
  );
}
