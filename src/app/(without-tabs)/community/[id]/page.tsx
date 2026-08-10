'use client'
import { useParams, useRouter } from 'next/navigation'
import { JSX, Suspense, useState } from 'react'
import { getAccessToken, getUserId } from '@/apis/auth'
import ArrowLeftIcon from '@/assets/icons/arrow_left.svg'
import KebabIcon from '@/assets/icons/edit.svg'
import PaperIcon from '@/assets/icons/paper_small.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import TrashIcon from '@/assets/icons/trash.svg'
import WarningIcon from '@/assets/icons/warning.svg'
import AlertDialog from '@/components/common/AlertDialog'
import Button from '@/components/common/Button'
import Separator from '@/components/common/Separator'
import Loading from '@/components/common/loading'
import { Menubox } from '@/components/common/menubox'
import ActionButton from '@/components/features/community/ActionButton'
import Comment from '@/components/features/community/Comment'
import ReportDialog from '@/components/features/community/ReportDialog'
import {
  useDeleteCommunityPost,
  useGetCommunityPostDetail,
  usePostCommunityPostComment,
  useToggleCommunityBookmark,
  useToggleCommunityLike,
} from '@/queries/community'
import { useReport } from '@/queries/moderation'
import { PostCommunityCommentBody } from '@/types/apis/community'
import { formatDate } from '@/utils/date'

const CommunityDetail = (): JSX.Element => {
  const params = useParams<{ id: string }>()
  const { id } = params ?? {}
  const postId = Number(id)
  const router = useRouter()

  const { data: post } = useGetCommunityPostDetail({ postId })
  const { mutate: addComment, isPending: isAddingComment } = usePostCommunityPostComment({ postId })
  const { mutate: deletePost, isPending: isDeleting } = useDeleteCommunityPost({ postId })
  const { mutate: toggleLike, isPending: isTogglingLike } = useToggleCommunityLike(postId)
  const { mutate: toggleBookmark, isPending: isTogglingBookmark } =
    useToggleCommunityBookmark(postId)
  const { mutate: report, isPending: isReporting } = useReport()

  const [newComment, setNewComment] = useState<string>('')
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)
  const [reportDialogVisible, setReportDialogVisible] = useState<boolean>(false)
  const [reportDone, setReportDone] = useState<boolean>(false)

  // 작성자 본인에게만 수정·삭제를, 그 외에는 신고를 노출한다.
  const isAuthor = !!post && getUserId() === post.authorId

  const requireLogin = (action: () => void) => {
    if (!getAccessToken()) {
      router.push('/')
      return
    }
    action()
  }

  const handleAddCommentButton = () => {
    if (!newComment.trim()) return

    requireLogin(() =>
      addComment({ content: newComment.trim() } as PostCommunityCommentBody, {
        onSuccess: () => setNewComment(''),
      }),
    )
  }

  const handleDeleteConfirm = () => {
    deletePost(undefined, {
      onSuccess: () => {
        setDeleteDialogVisible(false)
        router.push('/community')
      },
    })
  }

  const menuItems = isAuthor
    ? [
        { content: '수정', icon: PencilIcon, onSelect: () => router.push(`/community/${id}/edit`) },
        {
          content: '삭제',
          icon: TrashIcon,
          variant: 'destructive' as const,
          onSelect: () => setDeleteDialogVisible(true),
        },
      ]
    : [
        {
          content: '신고',
          icon: WarningIcon,
          variant: 'destructive' as const,
          onSelect: () => requireLogin(() => setReportDialogVisible(true)),
        },
      ]

  return (
    <Suspense fallback={<Loading content="게시글 불러오는 중..." />}>
      <div className="relative flex h-screen flex-col bg-white text-black">
        <header
          id="topNavigator"
          className="sticky top-0 z-1 flex items-center justify-start gap-2.5 bg-white py-3.5 pr-[0.9375rem] pl-5"
        >
          <button onClick={() => router.back()} aria-label="뒤로 가기">
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
                <div id="author">{post.isAnonymous ? '익명' : post.authorName}</div>
                <div className="h-2 w-[0.0625rem] bg-gray-200" />
                <div id="createAt">{formatDate(post.createdAt, 'MM/dd HH:mm')}</div>
              </div>
            </div>
            <Menubox
              triggerButton={
                <button aria-label="게시글 메뉴">
                  <KebabIcon className="h-6 w-6 cursor-pointer fill-black" />
                </button>
              }
              items={menuItems}
            />
          </div>

          <Separator className="w-full shrink-0" />

          <div className="text-b1-regular whitespace-pre-line">{post.content}</div>

          <div className="flex items-start gap-[1.125rem]">
            <ActionButton
              type="like"
              count={post.likeCount}
              active={post.isLiked}
              disabled={isTogglingLike}
              onClick={() => requireLogin(() => toggleLike())}
            />
            <ActionButton type="comment" count={post.commentCount} />
            <ActionButton
              type="bookmark"
              active={post.isBookmarked}
              disabled={isTogglingBookmark}
              onClick={() => requireLogin(() => toggleBookmark())}
            />
          </div>

          {reportDone && (
            <p className="text-b2-regular text-green-700" role="status">
              신고가 접수됐어요. 확인 후 조치할게요.
            </p>
          )}

          <Separator className="w-full shrink-0" />
          {post.comments?.map((comment) => (
            <Comment
              key={comment.commentId}
              comment={{
                author: comment.authorName,
                content: comment.content,
                timestamp: formatDate(comment.createdAt, 'MM/dd HH:mm'),
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleAddCommentButton()
              }}
              className="text-b1-regular w-full border-none bg-transparent outline-none"
            />
            <button
              onClick={handleAddCommentButton}
              disabled={isAddingComment || !newComment.trim()}
              aria-label="댓글 등록"
            >
              <PaperIcon className="size-6 fill-gray-600 disabled:opacity-50" />
            </button>
          </div>
        </div>

        <AlertDialog
          title="정말 삭제할까요?"
          description="삭제된 정보는 복구가 어려워요"
          isOpen={deleteDialogVisible}
          onClose={() => setDeleteDialogVisible(false)}
          cancelButton={
            <Button
              color="gray"
              size="small"
              onClick={() => setDeleteDialogVisible(false)}
              disabled={isDeleting}
            >
              취소
            </Button>
          }
          confirmButton={
            <Button color="red" size="small" onClick={handleDeleteConfirm} disabled={isDeleting}>
              삭제
            </Button>
          }
        />

        <ReportDialog
          isOpen={reportDialogVisible}
          targetType="POST"
          targetId={postId}
          isPending={isReporting}
          onClose={() => setReportDialogVisible(false)}
          onSubmit={(body) =>
            report(body, {
              onSuccess: () => {
                setReportDialogVisible(false)
                setReportDone(true)
              },
            })
          }
        />
      </div>
    </Suspense>
  )
}

export default CommunityDetail
