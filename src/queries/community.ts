import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import {
  deleteCommunityPost,
  getCommunityPostById,
  getCommunityPosts,
  postCommunityComment,
  postCommunityPost,
  putCommunityPost,
} from '@/apis/community'
import {
  DeleteCommunityPostPath,
  GetCommunityPostByIdPath,
  GetCommunityPostByIdResponse,
  GetCommunityPostsQuery,
  GetCommunityPostsResponse,
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

  detail: (postId: GetCommunityPostByIdPath['postId']) => ({
    queryKey: ['detail', { postId }],
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
}: DeleteCommunityPostPath): UseMutationResult<any, Error> => {
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
