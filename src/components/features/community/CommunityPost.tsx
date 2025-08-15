import { ReactElement } from 'react'
import Spacer from '@/components/common/Spacer'

interface CommunityPostProps {
  title: string
  content: string
  author: string
  timeAgo: string
}

const CommunityPost = ({ title, content, author, timeAgo }: CommunityPostProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2.5 px-6 py-3 bg-white">
      <h3 className="text-t2-regular text-black">{title}</h3>
      <p className="text-b1-regular text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
        {content}
      </p>
      <div className="flex items-center gap-2.5 text-c1-regular text-gray-500">
        <span>{author}</span>
        <Spacer className="h-2 w-px bg-gray-200" />
        <span>{timeAgo}</span>
      </div>
    </div>
  )
}

export default CommunityPost
