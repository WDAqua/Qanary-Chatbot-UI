import { Component } from "react";
import "./App.css";
import { MessageInput, MessagePanel, PageHeader } from "./components";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(messageText = "") {
    let messagesCopy = this.state.messages;
    const now = new Date();
    messagesCopy.push({
      text: messageText,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
    });
    this.setState({
      messages: messagesCopy,
    });
  }

  render() {
    return (
      <>
        <PageHeader />
        <MessagePanel messages={this.state.messages} />
        <MessageInput sendMessage={this.sendMessage} />
      </>
    );
  }
}

export default App;
