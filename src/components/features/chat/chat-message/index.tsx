import clsx from 'clsx'
import { ReactElement, memo } from 'react'

import ChatBubble from './ChatBubble'
import AssistantIcon from '@/assets/icons/assistant.svg'

interface ChatMessageProps {
  message: string
  isMyMessage: boolean
}

const ChatMessage = memo(({ message, isMyMessage }: ChatMessageProps): ReactElement => {
  return (
    <div className={clsx('flex gap-3.5', isMyMessage ? 'justify-end' : 'justify-start')}>
      {!isMyMessage && <AssistantIcon className="shrink-0 w-9.5 h-9.5" />}
      <ChatBubble type={isMyMessage ? 'user' : 'assistant'}>{message}</ChatBubble>
    </div>
  )
})

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage
