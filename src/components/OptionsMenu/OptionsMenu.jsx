import React from "react";
import { ClickableIcon } from "..";
import { textsHelper } from "../../helpers";
import german_flag_icon from "../share/imgs/german_flag_icon.webp";
import english_flag_icon from "../share/imgs/english_flag_icon.webp";
import "./OptionsMenu.css";

export default function OptionsMenu() {
  return (
    <div id="optionsMenu" className="right-side hidden">
      <ClickableIcon
        onClick={() => textsHelper.changeLanguage("de")}
        className="option"
        alt="Deutsch"
        icon={german_flag_icon}
        style={{
          width: "100px",
          height: "60px",
        }}
      />
      <ClickableIcon
        onClick={() => textsHelper.changeLanguage("en")}
        className="option"
        alt="Englisch"
        icon={english_flag_icon}
        style={{
          width: "100px",
          height: "60px",
        }}
      />
      <div className="option">Beispielfragen</div>
    </div>
  );
}
