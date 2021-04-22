import { Component } from "react";
import "./App.css";
import { MessageInput, MessagePanel, PageHeader } from "./components";
import chatBotService from "./services/chatbot.service";
import robot_icon from "./components/share/imgs/robot_icon.svg";
import user_icon from "./components/share/imgs/account_icon_black.svg";
import { textsHelper } from "./helpers";
import CONFIG from "./config.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      isSending: false,
    };

    this.texts = textsHelper.getTexts();

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const queryParams = window.location;
    // This RegExp accepts either ?question=questionText or &question=questionText to be as flexible as possible
    const queryRegExp = new RegExp(
      `\\?${CONFIG["initial-question-parameter-name"] || "question"}=([^&]*)|&${
        CONFIG["initial-question-parameter-name"] || "question"
      }=([^&]*)`
    );
    const potentialQueries = queryRegExp.exec(queryParams);
    // Pick the first result by default, unless it's empty or undefined (only possible cases)
    // Then decode it to use the intended string
    const initialQuestionText = decodeURIComponent(
      potentialQueries?.[1] || potentialQueries?.[2] || ""
    );
    if (!!initialQuestionText)
      this.sendMessage(decodeURIComponent(initialQuestionText));
    this.listenerId = textsHelper.addListener(() => {
      this.texts = textsHelper.getTexts();
      this.forceUpdate();
    });
    window.addEventListener("popstate", (popStateEvent) => {
      // Update component state with messages from history state
      this.setState({ messages: popStateEvent.state.messages });
    });
  }

  componentWillUnmount() {
    textsHelper.removeListener(this.listenerId);
  }

  async sendMessage(messageText = "") {
    // push new message to state
    this.setState({ isSending: true });
    let messagesCopy = this.state.messages;
    let now = new Date();
    messagesCopy.push({
      text: messageText,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
      isReply: false,
      loadedSuccessfully: true,
      icon: user_icon,
    });
    // await reply and push it to state
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
      icon: robot_icon,
    });
    this.setState({
      messages: messagesCopy,
      isSending: false,
    });
    // Push new state to history, see https://developer.mozilla.org/en-US/docs/Web/API/History_API
    let url = new URL(window.location);
    url.searchParams.set(
      CONFIG["initial-question-parameter-name"] || "question",
      messageText
    );
    window.history.pushState(
      {
        path: url.href,
        messages: messagesCopy,
      },
      "",
      url
    );
  }

  render() {
    const now = new Date();
    return (
      <>
        <PageHeader sendMessage={this.sendMessage} />
        <MessagePanel
          messages={[
            {
              text: this.texts["default-responses"]["initial-message"],
              followUpNeeded: false,
              loadedSuccessfully: false, // This is to prevent the source of data bit from showing up
              visualization: {},
              time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
              isReply: true,
              icon: robot_icon,
            },
            ...this.state.messages,
          ]}
        />
        <MessageInput
          sendMessage={this.sendMessage}
          isSending={this.state.isSending}
        />
      </>
    );
  }
}

export default App;
