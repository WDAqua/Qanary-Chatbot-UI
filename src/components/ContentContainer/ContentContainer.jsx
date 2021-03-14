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
      tabIndex="0"
      onBlur={() => {
        const self = document.getElementById(props.id);
        self.classList.toggle("hidden");
      }}
    >
      {props.children ?? undefined}
    </div>
  );
}
