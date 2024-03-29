import { Component } from "react";
import "./App.css";
import { MessageInput, MessagePanel, PageHeader } from "..";
import robot_icon from "../share/imgs/robot_icon.svg";
import user_icon from "../share/imgs/account_icon_black.svg";
import { textsHelper } from "../../helpers";
import {
  defaultBackendType,
  defaultChatbotComponents,
  initialQuestionParameter,
  defaultTheme,
  initialMessageTextEn,
  initialMessageTextDe,
} from "../../helpers/constants";
import {
  supportedServiceNames,
  supportedServices,
  supportedThemes,
} from "../../services";
import { getCurrentLanguage } from "../../helpers/getTexts";

class App extends Component {
  constructor(props) {
    super(props);

    this.texts = textsHelper.getTexts();
    const iconUrl = localStorage.getItem("iconUrl") ?? "";
    const backendType = 
        defaultBackendType in supportedServiceNames
          ? defaultBackendType
          : supportedServiceNames[0];
    const now = new Date(Date.now());
    const backendUrl = localStorage.getItem("backendUrl") ?? "";
    const components = 
        JSON.parse(localStorage.getItem("components")) ??
        defaultChatbotComponents;
    const isConfigured =
      backendType === "rasa"
        ? !!backendUrl
        : !!backendUrl && !!components?.length > 0;
    const getInitialMessage = () => {
      const currentLanguage = getCurrentLanguage()
      if (initialMessageTextEn && currentLanguage === "en") {
        return initialMessageTextEn.replace("{{url}}", backendUrl);
      } else if (initialMessageTextDe && currentLanguage === "de") {
        return initialMessageTextDe.replace("{{url}}", backendUrl);
      } else if (isConfigured) {
        return this.texts["default-responses"]["initial-message"][
          "is-configured"
        ].replace("{{url}}", backendUrl);
      } else {
        return this.texts["default-responses"]["initial-message"]["is-not-configured"];
      }
    }
    const initialMessage = getInitialMessage();

    this.state = {
      messages: [
        {
          text: initialMessage,
          followUpNeeded: false,
          loadedSuccessfully: false, // This is to prevent the source of data bit from showing up
          visualization: {},
          time: now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2),
          isReply: true,
          icon: iconUrl || robot_icon,
        },
      ],
      components,
      /* // TODO: Add back in once we move on from the MVP
      .map((componentName) => ({
        name: componentName,
        activated: false,
      }))*/
      backendUrl,
      isSending: false,
      backendType,
      currentTheme: localStorage.getItem("currentTheme") ?? defaultTheme,
      iconUrl,
    };


    this.sendMessage = this.sendMessage.bind(this);
    this.setBackendUrl = this.setBackendUrl.bind(this);
    this.setComponents = this.setComponents.bind(this);
    this.setBackendType = this.setBackendType.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.setIconUrl = this.setIconUrl.bind(this);
    // TODO: Add back in once we move on from the MVP
    // this.toggleComponent = this.toggleComponent.bind(this);
  }

  componentDidMount() {
    const queryParams = window.location;
    // This RegExp accepts either ?question=questionText or &question=questionText to be as flexible as possible
    const queryRegExp = new RegExp(
      `\\?${initialQuestionParameter}=([^&]*)|&${initialQuestionParameter}=([^&]*)`
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
    let messagesCopy = [...this.state.messages];
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
    let replies = await supportedServices[this.state.backendType].postQuery(
      messageText,
      this.state.backendUrl,
      preparedComponents
    );
    for (const reply of Array.isArray(replies) ? replies : [replies]) {
      if (!!reply.visualization?.buttons) {
        reply.visualization.buttons = reply.visualization.buttons.map(
          (button) => ({
            onClick: () => this.sendMessage(button.payload),
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
        icon: this.state.iconUrl || robot_icon,
      };

      if (typeof reply.answer === "object") {
        replyObject.tableData = reply.answer;
      } else {
        replyObject.text = reply.answer;
      }

      messagesCopy.push(replyObject);
    }
    this.setState({
      messages: messagesCopy,
      isSending: false,
    });
    // Push new state to history, see https://developer.mozilla.org/en-US/docs/Web/API/History_API
    let url = new URL(window.location);
    url.searchParams.set(
      initialQuestionParameter,
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

  setTheme(themeName) {
    if (!supportedThemes.includes(themeName)) return;

    localStorage.setItem("currentTheme", themeName);
    this.setState({
      currentTheme: themeName,
    });
  }

  setIconUrl(iconUrl) {
    const messagesCopy = this.state.messages.map((message) => {
      if (message.isReply) message.icon = iconUrl || robot_icon;
      return message;
    });

    localStorage.setItem("iconUrl", iconUrl);
    this.setState({
      iconUrl,
      messages: messagesCopy,
    });
  }

  setComponents(components) {
    // is array and only contains strings, if it has elements
    // TODO: Edit string check back once we move on from the MVP
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

    localStorage.setItem("components", JSON.stringify(components));
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
        !/^https?:\/\/.+?:\d{1,5}\/?$/.test(backendUrl))
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

    localStorage.setItem("backendUrl", backendUrl);

    this.setState({
      backendUrl,
      //components, // TODO: Edit back in once we move on from the MVP
    });
  }

  setBackendType(backendType) {
    if (supportedServiceNames.includes(backendType)) {
      this.setState({
        backendType,
      });
    }
  }

  render() {
    return (
      <div className={`theme ${this.state.currentTheme}`}>
        <PageHeader
          sendMessage={this.sendMessage}
          // toggleComponent={this.toggleComponent} // TODO: Add back in once we move on from the MVP
          setBackendUrl={this.setBackendUrl}
          setComponents={this.setComponents}
          setBackendType={this.setBackendType}
          setTheme={this.setTheme}
          setIconUrl={this.setIconUrl}
          components={this.state.components}
          backendUrl={this.state.backendUrl}
          backendType={this.state.backendType}
          currentTheme={this.state.currentTheme}
          iconUrl={this.state.iconUrl}
        />
        <MessagePanel
          messages={[
            ...this.state.messages,
          ]}
        />
        <MessageInput
          sendMessage={this.sendMessage}
          isSending={this.state.isSending}
        />
      </div>
    );
  }
}

export default App;
