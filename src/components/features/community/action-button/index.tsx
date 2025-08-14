import clsx from 'clsx'
import { ReactElement } from 'react'
import BookmarkIcon from '@/assets/icons/bookmark_thin.svg'
import CommentIcon from '@/assets/icons/chat_circle_thin.svg'

const ICON_MAP = {
  bookmark: BookmarkIcon,
  comment: CommentIcon,
} as const

const TEXT_MAP = {
  bookmark: '스크랩',
  comment: '댓글',
} as const

interface ActionButtonProps {
  type: keyof typeof ICON_MAP
  count?: number
  onClick?: () => void
  className?: string
}

const ActionButton = ({ type, count = 0, onClick, className }: ActionButtonProps): ReactElement => {
  const Icon = ICON_MAP[type]
  const text = TEXT_MAP[type]

  return (
    <button
      className={clsx('flex items-center gap-1 text-c1-regular text-gray-700', className)}
      onClick={onClick}
    >
      <Icon className="size-4.5 fill-gray-600" />
      <span>
        {text} {count}
      </span>
    </button>
  )
}

export default ActionButton
