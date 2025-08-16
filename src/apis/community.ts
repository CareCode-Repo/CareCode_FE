import { CareCode } from './interceptor'
import {
  GetCommunityPostByIdPath,
  getCommunityPostByIdPathSchema,
  GetCommunityPostByIdResponse,
  getCommunityPostByIdResponseSchema,
  GetCommunityPostsQuery,
  getCommunityPostsQuerySchema,
  GetCommunityPostsResponse,
  getCommunityPostsResponseSchema,
  PostCommunityCommentBody,
  postCommunityCommentBodySchema,
  PostCommunityCommentPath,
  postCommunityCommentPathSchema,
  PostCommunityCommentResponse,
  postCommunityCommentResponseSchema,
  PostCommunityPostBody,
  postCommunityPostBodySchema,
  PostCommunityPostResponse,
  postCommunityPostResponseSchema,
} from '@/types/apis/community'

export const getCommunityPosts = async (
  query: GetCommunityPostsQuery,
): Promise<GetCommunityPostsResponse> => {
  const parsedQuery = getCommunityPostsQuerySchema.parse(query)
  const res = await CareCode.get('/community/posts', {
    params: parsedQuery,
  })
  return getCommunityPostsResponseSchema.parse(res.data)
}

export const postCommunityPost = async (
  body: PostCommunityPostBody,
): Promise<PostCommunityPostResponse> => {
  const parsedBody = postCommunityPostBodySchema.parse(body)
  const res = await CareCode.post('/community/posts', parsedBody)
  return postCommunityPostResponseSchema.parse(res.data)
}

export const getCommunityPostById = async (
  path: GetCommunityPostByIdPath,
): Promise<GetCommunityPostByIdResponse> => {
  const parsedPath = getCommunityPostByIdPathSchema.parse(path)
  const res = await CareCode.get(`/community/posts/${parsedPath.postId}`)
  return getCommunityPostByIdResponseSchema.parse(res.data)
}

export const postCommunityComment = async (
  path: PostCommunityCommentPath,
  body: PostCommunityCommentBody,
): Promise<PostCommunityCommentResponse> => {
  const parsedPath = postCommunityCommentPathSchema.parse(path)
  const parsedBody = postCommunityCommentBodySchema.parse(body)
  const res = await CareCode.post(`/community/posts/${parsedPath.postId}/comments`, parsedBody)
  return postCommunityCommentResponseSchema.parse(res.data)
}
