// This will make it available project-wide
import './share/stylesheets/colors.css'
import './share/stylesheets/positions.css'

// This is a centralized import. It exports all components in a destructured way
// to allow easy and concise imports from one place, instead of import every single
// component from a different place

import MessageInput from './MessageInput/MessageInput'
import MessagePanel from './MessagePanel/MessagePanel'
import PageHeader from './PageHeader/PageHeader'
import Button from './Button/Button'
import ClickableIcon from './ClickableIcon/ClickableIcon'
import Message from './Message/Message'
import RichMessage from './RichMessage/RichMessage'
import Diagram from './Diagram/Diagram'
import OptionsMenu from './OptionsMenu/OptionsMenu'
import ContentContainer from './ContentContainer/ContentContainer'

export { MessageInput, MessagePanel, PageHeader, Button, ClickableIcon, Message, RichMessage, Diagram, OptionsMenu, ContentContainer }