// This will make it available project-wide
import './share/colors.css'
import './share/positions.css'

// This is a centralized import. It exports all components in a destructured way
// to allow easy and concise imports from one place, instead of import every single
// component from a different place

import MessageInput from './MessageInput/MessageInput'
import MessagePanel from './MessagePanel/MessagePanel'
import PageHeader from './PageHeader/PageHeader'
import Button from './Button/Button'

export { MessageInput, MessagePanel, PageHeader, Button }