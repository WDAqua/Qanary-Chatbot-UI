import React from "react";
import "./ContentContainer.css";

/**
 * 
 * @property {string} id 
 * @property {string} className
 * @property {object} dangerouslySetInnerHTML
 */
export default function ContentContainer(props) {
  return (
    <div
      id={props.id ?? ""}
      className={"contentContainer hidden" + (props.className ?? "")}
      dangerouslySetInnerHTML={
        // This isn't ideal. It would be better to just parse the text to add elements,
        // however since the source is entirely controlled by us, this is fine.
        // Try to avoid this at all costs in production code due to possible XSS
        // vulnerabilities in your application
        !!props.dangerouslySetInnerHTML
          ? {
              __html: props.dangerouslySetInnerHTML,
            }
          : undefined
      }
      tabIndex="0"
      onBlur={(blurEvent) => {
        const self = document.getElementById(props.id);
        // if this element is no longer focused and the new target isn't
        // either part of the element or the header, then hide self
        if (
          !document
            .getElementById("header")
            ?.contains?.(blurEvent?.relatedTarget) &&
          !self.contains(blurEvent?.relatedTarget)
        ) {
          self.classList.add("hidden");
        }
      }}
    >
      {props.children ?? undefined}
    </div>
  );
}
