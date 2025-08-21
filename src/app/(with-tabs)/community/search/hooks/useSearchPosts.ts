import { UseSuspenseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useGetCommunitySearch } from '@/queries/community'
import {
  GetCommunitySearchQuery,
  GetCommunitySearchResponse,
  PostListItem,
} from '@/types/apis/community'

export type UseSearchPostsReturn = {
  posts: PostListItem[]
} & Omit<UseSuspenseInfiniteQueryResult<InfiniteData<GetCommunitySearchResponse>, Error>, 'data'>

export function useSearchPosts(keyword: GetCommunitySearchQuery['keyword']): UseSearchPostsReturn {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } = useGetCommunitySearch({
    keyword,
    size: 10,
  })

  const posts = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data])

  return {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  }
}
