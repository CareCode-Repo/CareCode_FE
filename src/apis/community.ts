import { CareCode } from './interceptor'
import {
  DeleteCommunityPostPath,
  deleteCommunityPostPathSchema,
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
  PutCommunityPostBody,
  putCommunityPostBodySchema,
  PutCommunityPostPath,
  putCommunityPostPathSchema,
  PutCommunityPostResponse,
  putCommunityPostResponseSchema,
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

export const putCommunityPost = async (
  path: PutCommunityPostPath,
  body: PutCommunityPostBody,
): Promise<PutCommunityPostResponse> => {
  const parsedPath = putCommunityPostPathSchema.parse(path)
  const parsedBody = putCommunityPostBodySchema.parse(body)
  const res = await CareCode.put(`/community/posts/${parsedPath.postId}`, parsedBody)
  return putCommunityPostResponseSchema.parse(res.data)
}

export const deleteCommunityPost = async (path: DeleteCommunityPostPath): Promise<any> => {
  const parsedPath = deleteCommunityPostPathSchema.parse(path)
  const res = await CareCode.delete(`/community/posts/${parsedPath.postId}`)
  return res.data
}
