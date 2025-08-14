import { ReactElement } from 'react'
import Stat from './stat'
import CommentIcon from '@/assets/icons/chat.svg'
import LikeIcon from '@/assets/icons/like.svg'

interface PopularPostProps {
  content: string
  likeCount: number // 좋아요수
  commentCount: number // 댓글수
  createdDate: string // 작성날짜
  createdTime: string // 작성시간
  onClick?: () => void // 클릭 이벤트 핸들러
}

const PopularPost = ({
  content,
  likeCount,
  commentCount,
  createdDate,
  createdTime,
  onClick,
}: PopularPostProps): ReactElement => {
  return (
    <div className="flex py-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>
      <div className="flex-1 min-w-0 flex flex-col gap-1 text-gray-600">
        <p className="text-t2-regular truncate">{content}</p>
        <span className="text-c1-regular">
          {createdDate} {createdTime}
        </span>
      </div>
      <div className="shrink-0 flex gap-1 items-end">
        <Stat icon={LikeIcon} count={likeCount} className="[&_svg]:fill-red text-red" />
        <Stat icon={CommentIcon} count={commentCount} className="[&_svg]:fill-blue text-blue" />
      </div>
    </div>
  )
}

export default PopularPost
