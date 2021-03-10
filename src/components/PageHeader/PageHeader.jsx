import React from "react";
import { ClickableIcon } from "..";
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
    <div id="header" className="burgundy">
      <ClickableIcon
        onClick={() => console.log("Hi")}
        icon={info_icon_white}
        alt={"Info"}
        style={{
          float: "left",
          height: "100%",
          width: "60px",
        }}
      />
      <ClickableIcon
        onClick={() => console.log("Hi2")}
        icon={more_icon_white}
        alt={"Info"}
        style={{
          float: "right",
          height: "100%",
          width: "60px",
        }}
      />
    </div>
  );
}
