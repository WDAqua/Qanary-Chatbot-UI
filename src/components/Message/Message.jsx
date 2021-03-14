import React, { Component } from "react";
import { ClickableIcon } from "..";
import "./Message.css";
import account_icon_black from "../share/imgs/account_icon_black.svg";
import { textsHelper } from "../../helpers";

export default class Message extends Component {
  texts = textsHelper.getTexts();

  componentDidMount() {
    this.listenerId = textsHelper.addListener(() => {
      this.texts = textsHelper.getTexts();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    textsHelper.removeListener(this.listenerId);
  }

  render() {
    return (
      <div
        tabIndex="-1"
        className={
          "messageContainer" +
          (!!this.props.messageObject?.isReply ? " reply" : "")
        }
      >
        <ClickableIcon
          alt="Avatar"
          icon={this.props.messageObject?.icon ?? account_icon_black}
          tabIndex={"-1"}
          style={{
            width: "100px",
            height: "100px",
            cursor: "initial",
          }}
        />
        <div
          tabIndex="0"
          className={
            "messageDataContainer"
          }
        >
          <div
            className={
              "messageText" +
              (!!this.props.messageObject?.isReply
                ? " white-text"
                : " black-text")
            }
            dangerouslySetInnerHTML={{
              __html: this.props.messageObject?.text ?? "",
            }}
          >
          </div>
          {!this.props.messageObject?.follow_up_needed &&
          !!this.props.messageObject?.isReply &&
          !!this.props.messageObject?.loadedSuccessfully ? (
            <div
              className={
                "messageText" +
                (!!this.props.messageObject?.isReply
                  ? " white-text"
                  : " black-text")
              }
            >
              {this.texts["message-info"]["source-of-data"]}
              <a
                href="https://experience.arcgis.com/experience/478220a4c454480e823b17327b2bf1d4/page/page_0/"
                rel="noreferrer"
                target="_blank"
              >
                {this.texts["message-info"]["robert-koch-institute"]}
              </a>{" "}
            </div>
          ) : null}
          <div className="messageTimeSent">
            {this.props.messageObject?.time}
          </div>
        </div>
      </div>
    );
  }
}
