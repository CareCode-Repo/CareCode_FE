import { createQueryKeys } from '@lukemorales/query-key-factory'
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getCommunityPosts } from '@/apis/community'
import {
  GetCommunityPostByIdPath,
  GetCommunityPostsQuery,
  GetCommunityPostsResponse,
} from '@/types/apis/community'

export const communityQueries = createQueryKeys('community', {
  list: (query: GetCommunityPostsQuery) => ({
    queryKey: ['list', query],
  }),

  detail: (postId: GetCommunityPostByIdPath['postId']) => ({
    queryKey: ['detail', { postId }],
  }),

  comments: (postId: GetCommunityPostByIdPath['postId']) => ({
    queryKey: ['comments', { postId }],
  }),
})

export const useGetCommunityPosts = (
  query: GetCommunityPostsQuery,
): UseInfiniteQueryResult<InfiniteData<GetCommunityPostsResponse>, Error> => {
  return useInfiniteQuery({
    queryKey: communityQueries.list(query).queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) =>
      await getCommunityPosts({ ...query, page: pageParam }),
    getNextPageParam: (lastPage: GetCommunityPostsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}
