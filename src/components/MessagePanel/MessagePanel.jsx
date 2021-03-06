import React, { Component } from "react";
import { Message, RichMessage, TableMessage } from "..";
import "./MessagePanel.css";

/**
 * @description Contains and displays all messages as the correct components
 *
 * @property {array} messages all message objects, as specified by the typedef in `RichMessage.jsx`
 */
export default class MessagePanel extends Component {
  componentDidUpdate() {
    // this component updates when new messages are added
    // so with every new message, a scroll to the newest message is triggered
    window.requestAnimationFrame(() => {
      const messagePanel = document.getElementById("messagePanel");
      messagePanel.scrollTop += messagePanel.scrollHeight;
    });
  }

  render() {
    const messageElements = this.props.messages?.map?.((message, i) => {
      // i is the shortest unique identifier in this case and the content will not be shuffled, so i is constant
      if (!!message.tableData) {
        return <TableMessage key={i} messageObject={message} />;
      } else if (!!message.visualization) {
        return  <RichMessage key={i} id={i} messageObject={message} />;
      } else {
        return <Message key={i} messageObject={message} />;
      }
    });
    return (
      <div tabIndex="-1" id="messagePanel">
        {!!messageElements?.length > 0 ? messageElements : null}
      </div>
    );
  }
}
