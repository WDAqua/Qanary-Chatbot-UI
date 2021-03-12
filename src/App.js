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
    this.setState({ isSending: true });
    let messagesCopy = this.state.messages;
    let now = new Date();
    messagesCopy.push({
      text: messageText,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
      isReply: false,
      loadedSuccessfully: true,
    });
    let reply = await chatBotService.postQuery(messageText);
    if (!!reply.visualization?.buttons)
      reply.visualization.buttons = reply.visualization.buttons.map(
        (button) => ({
          onClick: () => this.sendMessage(button.payload),
          ...button,
        })
      );

    now = new Date();
    messagesCopy.push({
      text: reply.answer,
      followUpNeeded: reply.followUpNeeded,
      loadedSuccessfully: reply.loadedSuccessfully,
      visualization: reply.visualization,
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
        <PageHeader sendMessage={this.sendMessage} />
        <MessagePanel messages={this.state.messages} />
        <MessageInput
          sendMessage={this.sendMessage}
          isSending={this.state.isSending}
        />
      </>
    );
  }
}

export default App;
