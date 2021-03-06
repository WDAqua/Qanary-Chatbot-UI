// This will make it available project-wide
import "./share/stylesheets/colors.css";
import "./share/stylesheets/positions.css";

// This is a centralized import. It exports all components in a destructured way
// to allow easy and concise imports from one place, instead of import every single
// component from a different place

import App from "./App/App";
import MessageInput from "./MessageInput/MessageInput";
import MessagePanel from "./MessagePanel/MessagePanel";
import PageHeader from "./PageHeader/PageHeader";
import Button from "./Button/Button";
import ClickableIcon from "./ClickableIcon/ClickableIcon";
import Message from "./Message/Message";
import RichMessage from "./RichMessage/RichMessage";
import ContentContainer from "./ContentContainer/ContentContainer";
import SettingsContainer from "./SettingsContainer/SettingsContainer";
import QuestionsContainer from "./QuestionsContainer/QuestionsContainer";
import ImprintContainer from "./ImprintContainer/ImprintContainer";
import TableMessage from "./TableMessage/TableMessage";

export {
  App,
  MessageInput,
  MessagePanel,
  PageHeader,
  Button,
  ClickableIcon,
  Message,
  RichMessage,
  ContentContainer,
  SettingsContainer,
  QuestionsContainer,
  ImprintContainer,
  TableMessage,
};
