'use client'
import { useRouter } from 'next/navigation'
import { JSX } from 'react'
import TimeAgo from './TimeAgo'
import Spacer from '@/components/common/Spacer'
import { PostListItem } from '@/types/apis/community'

interface CommunityPostProps {
  post: PostListItem
}

const CommunityPost = ({ post }: CommunityPostProps): JSX.Element => {
  const router = useRouter()
  const handlePostClick = () => {
    router.push(`/community/${post.id}`)
  }

  return (
    <button
      onClick={handlePostClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handlePostClick()
        }
      }}
      className="flex w-full flex-col items-start justify-center gap-2.5 bg-white px-6 py-3"
    >
      <h3 className="text-t2-regular text-black">{post.title}</h3>
      <p className="text-b1-regular overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
        {post.content}
      </p>
      <div className="text-c1-regular flex items-center gap-2.5 text-gray-500">
        <span>{post.author.name}</span>
        <Spacer className="h-2 w-px bg-gray-200" />
        <TimeAgo date={post.createdAt} />
      </div>
    </button>
  )
}

export default CommunityPost
