import { Component } from "react";
import "./App.css";
import { MessageInput, MessagePanel, PageHeader } from "..";
import chatBotService from "../../services/chatbot.service";
import robot_icon from "../share/imgs/robot_icon.svg";
import user_icon from "../share/imgs/account_icon_black.svg";
import { textsHelper } from "../../helpers";
import CONFIG from "../../config.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      components: CONFIG["default-chatbot-components"],
      /* // TODO: Add back in once we move on from the MVP
      .map((componentName) => ({
        name: componentName,
        activated: false,
      }))*/
      backendUrl: "",
      isSending: false,
    };

    this.texts = textsHelper.getTexts();

    this.sendMessage = this.sendMessage.bind(this);
    this.setBackendUrl = this.setBackendUrl.bind(this);
    this.setComponents = this.setComponents.bind(this);
    // this.toggleComponent = this.toggleComponent.bind(this); // TODO: Add back in once we move on from the MVP
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
      if (popStateEvent.state == null) {
        this.setState({ messages: [] });
      } else {
        this.setState({ messages: popStateEvent?.state?.messages ?? [] });
      }
    });
  }

  componentWillUnmount() {
    textsHelper.removeListener(this.listenerId);
  }

  async sendMessage(messageText = "") {
    // push new message to state
    this.setState({ isSending: true });
    let messagesCopy = this.state.messages;
    let now = new Date(Date.now());
    messagesCopy.push({
      text: messageText,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
      isReply: false,
      loadedSuccessfully: true,
      icon: user_icon,
    });
    // await reply and push it to state
    const preparedComponents = this.state.components;
    // .filter((component) => component.activated) // TODO: Not needed for MVP
    // .map((component) => component); // TODO: Edit back once we move on from the MVP
    let reply = await chatBotService.postQuery(
      messageText,
      this.state.backendUrl,
      preparedComponents
    );
    if (!!reply.visualization?.buttons) {
      reply.visualization.buttons = reply.visualization.buttons.map(
        (button) => ({
          onClick: () =>
            this.sendMessage(button.payload),
          ...button,
        })
      );
    }

    now = new Date(Date.now());

    const replyObject = {
      followUpNeeded: reply.followUpNeeded,
      loadedSuccessfully: reply.loadedSuccessfully,
      visualization: reply.visualization,
      time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
      isReply: true,
      icon: robot_icon,
    };

    if (typeof reply.answer === "object") {
      replyObject.tableData = reply.answer;
    } else {
      replyObject.text = reply.answer;
    }

    messagesCopy.push(replyObject);
    this.setState({
      messages: messagesCopy,
      isSending: false,
    });
    // Push new state to history, see https://developer.mozilla.org/en-US/docs/Web/API/History_API
    let url = new URL(window.location);
    url.searchParams.set(
      CONFIG["initial-question-parameter-name"] || "question",
      encodeURIComponent(messageText)
    );
    messagesCopy = messagesCopy.map((message) =>
      message.followUpNeeded
        ? { ...message, visualization: undefined }
        : message
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

  setComponents(components) {
    // is array and only contains strings, if it has elements
    // TODO: Edit string check back once we move on from the MVP
    console.log(components);
    if (
      !Array.isArray(components) ||
      (Array.isArray(components) &&
        components.length > 0 &&
        !components.every(
          (component) =>
            component instanceof String || typeof component === "string"
        ))
    ) {
      throw new Error("components have to be an array");
    }

    this.setState({
      components,
    });
  }

  /*
  TODO: Not needed for the MVP, kept for potential use later on
  toggleComponent(component) {
    const components = this.state.components;

    const index = components.indexOf(component);

    components[index] = {
      name: component.name,
      activated: !component.activated,
    };

    this.setState({ components });
  }*/

  async setBackendUrl(backendUrl) {
    // is string and ends with port and optionally a slash and NOT /#/application or something else
    if (
      (typeof backendUrl !== "string" && !(backendUrl instanceof String)) ||
      ((typeof backendUrl === "string" || backendUrl instanceof String) &&
        !/^https{0,1}:\/\/.+?:\d{1,5}\/?$/.test(backendUrl))
    ) {
      throw new Error("backend url needs to be string of url with base route");
    }

    /*
    TODO: Dynamic requesting of components would require CORS configuration, so we'll just go with the MVP for now
    const componentNames =
      (await chatBotService.getComponents(backendUrl)) ?? [];
    const components = componentNames.map((componentName) => ({
      name: componentName,
      activated: false,
    }));
    */

    this.setState({
      backendUrl,
      //components, // TODO: Edit back in once we move on from the MVP
    });
  }

  render() {
    const now = new Date(Date.now());
    const initialMessage =
      !!this.state.backendUrl && !!this.state.components?.length > 0
        ? this.texts["default-responses"]["initial-message"][
            "is-configured"
          ].replace("{{url}}", this.state.backendUrl)
        : this.texts["default-responses"]["initial-message"][
            "is-not-configured"
          ];
    return (
      <>
        <PageHeader
          sendMessage={this.sendMessage}
          // toggleComponent={this.toggleComponent} // TODO: Add back in once we move on from the MVP
          setBackendUrl={this.setBackendUrl}
          setComponents={this.setComponents}
          components={this.state.components}
          backendUrl={this.state.backendUrl}
        />
        <MessagePanel
          messages={[
            {
              text: initialMessage,
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
