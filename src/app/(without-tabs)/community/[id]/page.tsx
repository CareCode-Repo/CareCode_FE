'use client'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { JSX, useState } from 'react'
import ArrowLeftIcon from '@/assets/icons/arrow_left.svg'
import KebabIcon from '@/assets/icons/edit.svg'
import PaperIcon from '@/assets/icons/paper_small.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import TrashIcon from '@/assets/icons/trash.svg'
import Separator from '@/components/common/Separator'
import { Menubox } from '@/components/common/menubox'
import ActionButton from '@/components/features/community/ActionButton'
import Comment from '@/components/features/community/Comment'
import { Post } from '@/types/apis/community'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  params: { id: string }
}

export const postDetailDummy: Post = {
  id: 1,
  title: 'Next.js 15 버전 업데이트 주요 내용 정리',
  content:
    '안녕하세요! 이번에 발표된 Next.js 15의 주요 업데이트 내용을 정리해봤습니다.\n\n가장 큰 변화는 React Compiler 지원이 기본으로 활성화된 점입니다. 덕분에 별도 설정 없이도 앱의 렌더링 성능이 크게 향상될 수 있습니다.\n\n자세한 내용은 본문을 참고해주세요.',
  category: '프론트엔드',
  author: {
    userId: 'dev_hong',
    name: '홍길동',
    profileImageUrl: 'https://avatar.iran.liara.run/public/boy',
  },
  tags: ['Next.js', 'React', 'TypeScript', '프론트엔드'],
  viewCount: 1284,
  likeCount: 256,
  commentCount: 2,
  isAnonymous: false,
  createdAt: '2025-08-18T14:30:00Z',
  updatedAt: '2025-08-18T14:35:00Z',
  comments: [
    {
      userId: 'user_lee',
      name: '이순신',
      content: '좋은 정보 감사합니다! React Compiler 기대되네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
  ],
}

const CommunityDetail = (): JSX.Element => {
  const params = useParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = params ?? {}
  const [newComment, setNewComment] = useState<string>('')

  const post = postDetailDummy
  const router = useRouter()

  const handleAddCommentButton = () => {
    console.log('Add Comment Button Pressed')
  }

  const handleDeleteButton = () => {
    console.log('Delete Button Pressed')
  }

  const handleEditButton = () => {
    console.log('Edit Button Pressed')
  }

  const handleLikeButton = () => {
    console.log('Like Button Pressed')
  }

  return (
    <div className="flex flex-col bg-white  h-screen relative text-black">
      <header
        id="topNavigator"
        className="flex justify-start pl-5 pr-[0.9375rem] py-3.5 items-center bg-white sticky top-0 z-1 gap-2.5"
      >
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="size-6 fill-black" />
        </button>
        <div className="text-h3-bold ">게시글 조회</div>
      </header>

      <div className="flex-1 overflow-y-scroll scrollbar-hide p-6 pb-30 flex flex-col gap-[1.125rem]">
        <div className="flex w-full justify-between items-start">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div id="title" className="text-t1-semibold ">
              {post.title}
            </div>

            <div className="flex items-center gap-1 text-c1-regular text-gray-500">
              <div id="author">{post.author.name}</div>
              <div className="w-[0.0625rem] h-2 bg-gray-200" />
              <div id="createAt">{format(new Date(post.createdAt), 'MM/dd HH:mm')}</div>
            </div>
          </div>
          <Menubox
            triggerButton={<KebabIcon className="w-6 h-6 cursor-pointer fill-black" />}
            items={[
              {
                content: '수정',
                icon: PencilIcon,
                onSelect: handleEditButton,
              },
              {
                content: '삭제',
                icon: TrashIcon,
                variant: 'destructive',
                onSelect: handleDeleteButton,
              },
            ]}
          />
        </div>

        <Separator className="w-full shrink-0" />

        <div className="text-b1-regular whitespace-pre-line">{post.content}</div>

        <div className="flex items-start gap-[1.125rem]">
          <ActionButton type={'like'} count={post.likeCount} onClick={handleLikeButton} />
          <ActionButton type={'comment'} count={post.commentCount} />
        </div>

        <Separator className="w-full shrink-0" />
        {post.comments?.map((comment, index) => (
          <Comment
            key={index}
            comment={{
              author: comment.name,
              content: comment.content,
              timestamp: format(new Date('2025-08-18T14:30:00Z'), 'MM/dd HH:mm'),
            }}
            className="w-full"
          />
        ))}
      </div>

      <div className="flex w-full py-6 px-3.5 items-center bg-white/20 absolute bottom-0 z-1">
        <div className="flex w-full px-[1.125rem] py-2.5 justify-center items-center rounded-3xl border border-green-300 bg-white">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border-none outline-none bg-transparent w-full text-b1-regular"
          />
          <button onClick={handleAddCommentButton}>
            <PaperIcon className="size-6 fill-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetail
