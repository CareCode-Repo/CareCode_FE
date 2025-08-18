import clsx from 'clsx'
import { ReactElement } from 'react'
import CommentIcon from '@/assets/icons/chat_small.svg'
import LikeIcon from '@/assets/icons/like.svg'

const ICON_MAP = {
  like: LikeIcon,
  comment: CommentIcon,
} as const

const TEXT_MAP = {
  like: '좋아요',
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
      className={clsx('text-c1-regular flex items-center gap-1 text-gray-700', className)}
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
