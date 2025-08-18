import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useGetCommunityPosts } from '@/queries/community'
import { GetCommunityPostsQuery, GetCommunityPostsResponse } from '@/types/apis/community'

export type UsePostsReturn = {
  posts: GetCommunityPostsResponse['content']
} & Omit<UseInfiniteQueryResult<InfiniteData<GetCommunityPostsResponse>, Error>, 'data'>

export function usePosts(query: GetCommunityPostsQuery): UsePostsReturn {
  const queryResult = useGetCommunityPosts(query)

  const posts = useMemo(
    () => queryResult.data?.pages.flatMap((page) => page.content) ?? [],
    [queryResult.data],
  )

  const { fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } = queryResult

  return {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  }
}
