import React from "react";
import { ClickableIcon, InfoContainer, OptionsMenu } from "..";
import "./PageHeader.css";
import info_icon_white from "../share/imgs/info_icon_white.svg";
import more_icon_white from "../share/imgs/more_icon_white.svg";
//import info_icon_black from '../share/imgs/info_icon_black.svg'
//import more_icon_black from '../share/imgs/more_icon_black.svg'

/**
 * @name PageHeader
 *
 * @description This is the header of the page containing the title and various buttons
 *
 */
export default function PageHeader() {
  return (
    <>
      <div tabIndex="-1" id="header" className="burgundy">
        <ClickableIcon
          onClick={() => {
            document.getElementById("imprint").classList.toggle("hidden");
          }}
          icon={info_icon_white}
          alt={"Info"}
          style={{
            float: "left",
            height: "100%",
            width: "60px",
          }}
        />
        <ClickableIcon
          onClick={() => {
            document.getElementById("optionsMenu").classList.toggle("hidden");
          }}
          icon={more_icon_white}
          alt={"More"}
          style={{
            float: "right",
            height: "100%",
            width: "60px",
          }}
        />
      </div>
      <OptionsMenu />
      <InfoContainer id="imprint" info="This is an imprint." />
      <InfoContainer id="exemplaryQuestions" info="These are exemplary questions." />
    </>
  );
}
