import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getCommunityPostById, getCommunityPosts } from '@/apis/community'
import { GetCommunityPostByIdPath, GetCommunityPostsQuery } from '@/types/apis/community'

export const communityQueries = createQueryKeys('community', {
  list: (query: GetCommunityPostsQuery) => ({
    queryKey: ['list', query],
    queryFn: () => getCommunityPosts(query),
  }),

  detail: (postId: GetCommunityPostByIdPath['postId']) => ({
    queryKey: ['detail', { postId }],
    queryFn: () => getCommunityPostById({ postId }),
  }),

  comments: (postId: GetCommunityPostByIdPath['postId']) => ({
    queryKey: ['comments', { postId }],
    queryFn: () => getCommunityPostById({ postId }).then((res) => res.comments),
  }),
})
