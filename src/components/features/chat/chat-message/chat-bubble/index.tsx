import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface ChatBubbleProps {
  type?: 'user' | 'assistant'
  className?: string
  children: ReactNode
}

const ChatBubble = ({ type = 'user', className, children }: ChatBubbleProps): ReactElement => {
  return (
    <div
      className={clsx(
        'text-b2-regular text-black p-3 max-w-xs rounded-t-lg break-words',
        {
          'bg-green-100 rounded-bl-lg': type === 'user',
          'border border-gray-300 bg-white rounded-br-lg': type === 'assistant',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default ChatBubble
