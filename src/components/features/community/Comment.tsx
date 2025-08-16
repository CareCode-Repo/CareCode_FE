import clsx from 'clsx'
import { ReactElement } from 'react'
import ArrowDownRightIcon from '@/assets/icons/arrow_down_right_thin.svg'

type Comment = {
  author: string
  content: string
  timestamp: string
  replies?: Comment[]
}

interface CommentProps {
  comment: Comment
  isReply?: boolean
  className?: string
}

const Comment = ({ comment, isReply = false, className }: CommentProps): ReactElement => {
  return (
    <div className={className}>
      {/* 메인 댓글 */}
      <div className={clsx('flex gap-1')}>
        {/* 답글 표시 아이콘 */}
        {isReply && <ArrowDownRightIcon className="size-6 fill-gray-600" />}
        <div className="flex flex-col gap-3 p-3.5 grow bg-gray-100 rounded-xl">
          {/* 작성자 */}
          <span className="text-c1-regular text-black">{comment.author}</span>
          {/*  내용 */}
          <p className="text-b2-regular text-gray-800">{comment.content}</p>
          {/* 작성 시간 */}
          <span className="text-c1-regular text-gray-500">{comment.timestamp}</span>
        </div>
      </div>

      {/* 대댓글들 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply, index) => (
            <Comment key={`${comment.author}-${index}`} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
