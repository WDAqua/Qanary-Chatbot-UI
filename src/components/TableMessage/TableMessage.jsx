import React, { Component } from "react";
import { ClickableIcon } from "..";
import { textsHelper } from "../../helpers";
import account_icon_black from "../share/imgs/account_icon_black.svg";
import "./TableMessage.css";

/**
 * @typedef {object} TableMessage
 *   @property {boolean} isReply determines whether it's a bot or user message (left or right side, colour scheme, etc.)
 *   @property {boolean} loadedSuccessfully determines if source disclaimer gets displayed or not
 *   @property {boolean} followUpNeeded determines if extra buttons are displayed
 *   @property {string} time The time the message was sent
 *   @property {string} icon The image next to the message
 *   @property {string} tableData The message's contents
 *
 * @description A special variant of the message component, supporting table data
 *
 * @property {TableMessage} messageObject
 */
export default class TableMessage extends Component {
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
    const tableHeaders = this.props.messageObject.tableData.head.vars.map(
      (header) => <td>{header}</td>
    );
    const tableElements =
      this.props.messageObject.tableData.results.bindings.map((dataSet) => (
        <tr>
          {this.props.messageObject.tableData.head.vars.map((header) => (
            <td dangerouslySetInnerHTML={{ __html: dataSet[header].value }} />
          ))}
        </tr>
      ));

    return (
      <div
        tabIndex="-1"
        className={
          "messageContainer" +
          (!!this.props.messageObject?.isReply ? " reply" : "")
        }
      >
        <ClickableIcon
          alt={
            !!this.props.messageObject?.isReply
              ? this.texts["clickable-icon"]["bot-icon-alt"]
              : this.texts["clickable-icon"]["user-icon-alt"]
          }
          icon={this.props.messageObject?.icon ?? account_icon_black}
          tabIndex={"-1"}
          style={{
            width: "100px",
            height: "100px",
            cursor: "initial",
          }}
        />
        <div tabIndex="0" className={"messageDataContainer"}>
          <table
            className={
              "dataTable" +
              (!!this.props.messageObject?.isReply
                ? " white-text"
                : " black-text")
            }
          >
            <thead>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>{tableElements}</tbody>
          </table>
          <div className="messageTimeSent">
            {this.props.messageObject?.time}
          </div>
        </div>
      </div>
    );
  }
}
