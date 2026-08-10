'use client'
import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactElement, Suspense } from 'react'
import AuthGuard from '@/components/common/AuthGuard'
import EmptyState from '@/components/common/EmptyState'
import Layout from '@/components/common/Layout'
import PostListItem from '@/components/features/community/PostListItem'
import { useBookmarkedPosts, useLikedPosts } from '@/queries/community'
import { PostListItem as Post } from '@/types/apis/community'

const TABS = [
  { value: 'liked', label: '좋아요한 글' },
  { value: 'bookmarked', label: '북마크' },
] as const

const PostSection = ({
  posts,
  isLoading,
  emptyTitle,
  emptyDescription,
}: {
  posts: Post[]
  isLoading: boolean
  emptyTitle: string
  emptyDescription: string
}): ReactElement => {
  const router = useRouter()

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <li key={i} className="h-24 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </ul>
    )
  }

  if (!posts.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <li key={post.postId}>
          <PostListItem post={post} onClick={() => router.push(`/community/${post.postId}`)} />
        </li>
      ))}
    </ul>
  )
}

const ActivityContent = (): ReactElement => {
  const searchParams = useSearchParams()
  const defaultTab = searchParams?.get('tab') === 'bookmarked' ? 'bookmarked' : 'liked'

  const { data: liked = [], isLoading: isLikedLoading } = useLikedPosts()
  const { data: bookmarked = [], isLoading: isBookmarkedLoading } = useBookmarkedPosts()

  return (
    <Tabs.Root defaultValue={defaultTab} className="flex grow flex-col">
      <Tabs.List className="flex border-b border-gray-200 bg-white">
        {TABS.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={clsx(
              'text-b1-semibold flex-1 cursor-pointer py-3 text-gray-500 transition-colors',
              'data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700',
            )}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="liked" className="px-4.5 py-5">
        <PostSection
          posts={liked}
          isLoading={isLikedLoading}
          emptyTitle="좋아요한 글이 없어요"
          emptyDescription="마음에 드는 글에 좋아요를 눌러보세요."
        />
      </Tabs.Content>

      <Tabs.Content value="bookmarked" className="px-4.5 py-5">
        <PostSection
          posts={bookmarked}
          isLoading={isBookmarkedLoading}
          emptyTitle="북마크한 글이 없어요"
          emptyDescription="나중에 다시 볼 글을 북마크해두세요."
        />
      </Tabs.Content>
    </Tabs.Root>
  )
}

const ActivityPage = (): ReactElement => {
  return (
    <AuthGuard>
      <Layout hasTopNav hasBackButton title="나의 활동">
        <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100" />}>
          <ActivityContent />
        </Suspense>
      </Layout>
    </AuthGuard>
  )
}

export default ActivityPage
