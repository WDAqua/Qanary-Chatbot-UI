import { Component } from "react";
import "./App.css";
import { MessageInput, MessagePanel, PageHeader } from "./components";
import chatBotService from "./services/chatbot.service";
import robot_icon_black from "./components/share/imgs/robot_icon_black.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      isSending: false,
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  async sendMessage(messageText = "") {
    this.setState({isSending: true});
    let messagesCopy = this.state.messages;
    let now = new Date();
    messagesCopy.push({
      text: messageText,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
      isReply: false,
    });
    const reply = await chatBotService.postQuery(messageText);
    now = new Date();
    messagesCopy.push({
      text: reply.answer,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
      isReply: true,
      icon: robot_icon_black,
    });
    this.setState({
      messages: messagesCopy,
      isSending: false,
    });
  }

  render() {
    return (
      <>
        <PageHeader />
        <MessagePanel messages={this.state.messages} />
        <MessageInput sendMessage={this.sendMessage} isSending={this.state.isSending} />
      </>
    );
  }
}

export default App;
