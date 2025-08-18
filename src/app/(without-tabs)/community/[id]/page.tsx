'use client'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { JSX, useState } from 'react'
import { postDetailDummy } from './dataDummy'
import ArrowLeftIcon from '@/assets/icons/arrow_left.svg'
import KebabIcon from '@/assets/icons/edit.svg'
import PaperIcon from '@/assets/icons/paper_small.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import TrashIcon from '@/assets/icons/trash.svg'
import AlertDialog from '@/components/common/AlertDialog'
import Button from '@/components/common/Button'
import Separator from '@/components/common/Separator'
import { Menubox } from '@/components/common/menubox'
import ActionButton from '@/components/features/community/ActionButton'
import Comment from '@/components/features/community/Comment'

const CommunityDetail = (): JSX.Element => {
  const params = useParams()

  const { id } = params ?? {}
  const [newComment, setNewComment] = useState<string>('')
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)
  const post = postDetailDummy
  const router = useRouter()

  const handleAddCommentButton = () => {
    console.log('Add Comment Button Pressed')
    // 로직처리 -> api 호출후 쿼리 refresh
  }

  const handleEditButton = () => {
    console.log('Edit Button Pressed')
    router.push(`${id}/edit`)
  }

  const handleDeleteButton = () => {
    console.log('Delete Button Pressed')
    setDeleteDialogVisible(true)
  }

  const handleLikeButton = () => {
    console.log('Like Button Pressed')
  }

  const handleDeleteConfirm = () => {
    console.log('Delete Confirmed')
    // 로직 처리
    router.back()
  }

  return (
    <div className="relative flex h-screen flex-col bg-white text-black">
      <header
        id="topNavigator"
        className="sticky top-0 z-1 flex items-center justify-start gap-2.5 bg-white py-3.5 pr-[0.9375rem] pl-5"
      >
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="size-6 fill-black" />
        </button>
        <div className="text-h3-bold">게시글 조회</div>
      </header>

      <div className="scrollbar-hide flex flex-1 flex-col gap-[1.125rem] overflow-y-scroll p-6 pb-30">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div id="title" className="text-t1-semibold">
              {post.title}
            </div>

            <div className="text-c1-regular flex items-center gap-1 text-gray-500">
              <div id="author">{post.author.name}</div>
              <div className="h-2 w-[0.0625rem] bg-gray-200" />
              <div id="createAt">{format(new Date(post.createdAt), 'MM/dd HH:mm')}</div>
            </div>
          </div>
          <Menubox
            triggerButton={<KebabIcon className="h-6 w-6 cursor-pointer fill-black" />}
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

      <div className="absolute bottom-0 z-1 flex w-full items-center bg-white/20 px-3.5 py-6">
        <div className="flex w-full items-center justify-center rounded-3xl border border-green-300 bg-white px-[1.125rem] py-2.5">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="text-b1-regular w-full border-none bg-transparent outline-none"
          />
          <button onClick={handleAddCommentButton}>
            <PaperIcon className="size-6 fill-gray-600" />
          </button>
        </div>
      </div>

      <AlertDialog
        title="정말 삭제할까요?"
        description="삭제된 정보는 복구가 어려워요"
        isOpen={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
        cancelButton={
          <Button color="gray" size="small" onClick={() => setDeleteDialogVisible(false)}>
            취소
          </Button>
        }
        confirmButton={
          <Button color="red" size="small" onClick={handleDeleteConfirm}>
            삭제
          </Button>
        }
      />
    </div>
  )
}

export default CommunityDetail
