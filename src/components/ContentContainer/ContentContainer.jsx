import React from "react";
import "./ContentContainer.css";

export default function ContentContainer(props) {
  return (
    <div
      id={props.id ?? ""}
      className={"contentContainer hidden" + (props.className ?? "")}
      dangerouslySetInnerHTML={
        !!props.dangerouslySetInnerHTML
          ? {
              __html: props.dangerouslySetInnerHTML,
            }
          : undefined
      }
      tabIndex="0"
      onBlur={(blurEvent) => {
        const self = document.getElementById(props.id);
        if (
          !document
            .getElementById("header")
            .contains(blurEvent.relatedTarget) &&
          !self.contains(blurEvent.relatedTarget)
        ) {
          self.classList.add("hidden");
        }
      }}
    >
      {props.children ?? undefined}
    </div>
  );
}
