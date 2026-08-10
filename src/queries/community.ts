import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import { getAccessToken } from '@/apis/auth'
import {
  deleteCommunityPost,
  getBookmarkedPosts,
  getCommunityPostById,
  getCommunityPosts,
  getCommunityPopular,
  getCommunitySearch,
  getCommunityTags,
  getLikedPosts,
  postCommunityComment,
  postCommunityPost,
  putCommunityPost,
  toggleCommunityBookmark,
  toggleCommunityLike,
} from '@/apis/community'
import {
  PostListItem,
  ToggleBookmarkResponse,
  ToggleLikeResponse,
  DeleteCommunityPostPath,
  GetCommunityPostByIdPath,
  GetCommunityPostByIdResponse,
  GetCommunityPostsQuery,
  GetCommunityPostsResponse,
  GetCommunitySearchQuery,
  GetCommunitySearchResponse,
  PostCommunityCommentBody,
  PostCommunityCommentPath,
  PostCommunityCommentResponse,
  PostCommunityPostBody,
  PostCommunityPostResponse,
  PutCommunityPostBody,
  PutCommunityPostPath,
  PutCommunityPostResponse,
} from '@/types/apis/community'

export const communityQueries = createQueryKeys('community', {
  list: () => ({
    queryKey: ['list'],
  }),

  popular: () => ({
    queryKey: ['popular'],
  }),

  detail: (postId: GetCommunityPostByIdPath['postId']) => ({
    queryKey: ['detail', { postId }],
  }),

  search: (keyword: GetCommunitySearchQuery['keyword'], size: GetCommunitySearchQuery['size']) => ({
    queryKey: [{ keyword, size }],
  }),

  liked: () => ({
    queryKey: ['liked'],
    queryFn: getLikedPosts,
  }),

  bookmarked: () => ({
    queryKey: ['bookmarked'],
    queryFn: getBookmarkedPosts,
  }),

  tags: () => ({
    queryKey: ['tags'],
    queryFn: getCommunityTags,
  }),
})

export const useGetCommunityPosts = (
  query: GetCommunityPostsQuery,
): UseInfiniteQueryResult<InfiniteData<GetCommunityPostsResponse>, Error> => {
  return useInfiniteQuery({
    queryKey: communityQueries.list().queryKey,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) =>
      await getCommunityPosts({ ...query, page: pageParam }),
    getNextPageParam: (lastPage: GetCommunityPostsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    retry: false,
  })
}

export const usePostCommunityPost = (): UseMutationResult<
  PostCommunityPostResponse,
  Error,
  PostCommunityPostBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: PostCommunityPostBody) => postCommunityPost(body), // 여기 mutationFn 타입 맞춤
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', 'list'] })
    },
  })
}

export const useGetCommunityPostDetail = ({
  postId,
}: GetCommunityPostByIdPath): UseSuspenseQueryResult<GetCommunityPostByIdResponse, Error> => {
  return useSuspenseQuery({
    queryKey: communityQueries.detail(postId).queryKey,
    queryFn: () => getCommunityPostById({ postId }),
  })
}

export const usePostCommunityPostComment = ({
  postId,
}: PostCommunityCommentPath): UseMutationResult<
  PostCommunityCommentResponse,
  Error,
  PostCommunityCommentBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: PostCommunityCommentBody) => postCommunityComment({ postId }, body),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: communityQueries.detail(postId).queryKey })
    },
  })
}

export const usePutCommunityPost = ({
  postId,
}: PutCommunityPostPath): UseMutationResult<
  PutCommunityPostResponse,
  Error,
  PutCommunityPostBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: PutCommunityPostBody) => putCommunityPost({ postId }, body),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: communityQueries.detail(postId).queryKey })
      queryClient.invalidateQueries({ queryKey: ['community', 'list'] })
    },
  })
}

export const useDeleteCommunityPost = ({
  postId,
}: DeleteCommunityPostPath): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteCommunityPost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', 'list'] })
      setTimeout(() => {
        queryClient.removeQueries({ queryKey: communityQueries.detail(postId).queryKey })
      }, 1000)
    },
  })
}

export const useGetCommunitySearch = ({
  keyword,
  size = 10,
}: {
  keyword: GetCommunitySearchQuery['keyword']
  size: GetCommunitySearchQuery['size']
}): UseSuspenseInfiniteQueryResult<InfiniteData<GetCommunitySearchResponse>, Error> => {
  return useSuspenseInfiniteQuery({
    queryKey: communityQueries.search(keyword, size).queryKey,
    queryFn: ({ pageParam = 0 }) => getCommunitySearch({ keyword, page: pageParam, size }),
    getNextPageParam: (lastPage: GetCommunitySearchResponse) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    initialPageParam: 0,
    retry: false,
  })
}

export const useGetCommunityPopular = (): UseQueryResult<GetCommunityPostsResponse, Error> => {
  return useQuery({
    queryKey: communityQueries.popular().queryKey,
    queryFn: () => getCommunityPopular({ page: 0, size: 5 }),
    retry: false,
  })
}

export const useLikedPosts = (): UseQueryResult<PostListItem[], Error> =>
  useQuery({ ...communityQueries.liked(), enabled: !!getAccessToken() })

export const useBookmarkedPosts = (): UseQueryResult<PostListItem[], Error> =>
  useQuery({ ...communityQueries.bookmarked(), enabled: !!getAccessToken() })

export const useCommunityTags = (): UseQueryResult<string[], Error> =>
  useQuery({ ...communityQueries.tags(), staleTime: 1000 * 60 * 30 })

/**
 * 좋아요 토글.
 * 응답 자체가 최신 상태(isLiked/likeCount)를 주므로 상세 캐시를 즉시 갱신하고,
 * 목록·좋아요함은 무효화해 다음 조회에서 맞춰지게 한다.
 */
export const useToggleCommunityLike = (
  postId: number,
): UseMutationResult<ToggleLikeResponse, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleCommunityLike(postId),
    onSuccess: (result) => {
      queryClient.setQueryData(
        communityQueries.detail(postId).queryKey,
        (prev: GetCommunityPostByIdResponse | undefined) =>
          prev ? { ...prev, isLiked: result.isLiked, likeCount: result.likeCount } : prev,
      )
      queryClient.invalidateQueries({ queryKey: communityQueries.liked().queryKey })
      queryClient.invalidateQueries({ queryKey: communityQueries.list().queryKey })
    },
  })
}

export const useToggleCommunityBookmark = (
  postId: number,
): UseMutationResult<ToggleBookmarkResponse, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleCommunityBookmark(postId),
    onSuccess: (result) => {
      queryClient.setQueryData(
        communityQueries.detail(postId).queryKey,
        (prev: GetCommunityPostByIdResponse | undefined) =>
          prev ? { ...prev, isBookmarked: result.isBookmarked } : prev,
      )
      queryClient.invalidateQueries({ queryKey: communityQueries.bookmarked().queryKey })
    },
  })
}
