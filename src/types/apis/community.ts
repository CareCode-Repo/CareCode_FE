import { z } from 'zod'

export const postAuthorSchema = z.object({
  userId: z.string(),
  name: z.string(),
  profileImageUrl: z.string().url().optional(),
})
export type PostAuthor = z.infer<typeof postAuthorSchema>

export const postCommentSchema = z.object({
  userId: z.string(),
  name: z.string(),
  content: z.string(),
})
export type PostComment = z.infer<typeof postCommentSchema>

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  author: postAuthorSchema,
  tags: z.array(z.string()),
  viewCount: z.number(),
  likeCount: z.number(),
  commentCount: z.number(),
  comments: z.array(postCommentSchema).optional(),
  isAnonymous: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const postListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  author: postAuthorSchema,
  tags: z.array(z.string()),
  viewCount: z.number(),
  likeCount: z.number(),
  commentCount: z.number(),
  isAnonymous: z.boolean(),
  createdAt: z.string(),
})
export type PostListItem = z.infer<typeof postListItemSchema>

// /community/posts 게시글 리스트 조회
export const getCommunityPostsQuerySchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  category: z.string().optional(),
  sort: z.string().optional(),
})
export type GetCommunityPostsQuery = z.infer<typeof getCommunityPostsQuerySchema>
export const getCommunityPostsResponseSchema = z.object({
  success: z.boolean(),
  content: z.array(postListItemSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
})
export type GetCommunityPostsResponse = z.infer<typeof getCommunityPostsResponseSchema>

// /community/posts 게시글 등록
export const postCommunityPostBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().default('PARENTING'),
  tags: z.array(z.string()).optional(),
  isAnonymous: z.boolean().default(false),
})
export type PostCommunityPostBody = z.infer<typeof postCommunityPostBodySchema>
export const postCommunityPostResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  postId: z.number(),
})
export type PostCommunityPostResponse = z.infer<typeof postCommunityPostResponseSchema>

// /community/posts/{postId} 게시글 상세 조회
export const getCommunityPostByIdPathSchema = z.object({
  postId: z.number(),
})
export type GetCommunityPostByIdPath = z.infer<typeof getCommunityPostByIdPathSchema>
export const getCommunityPostByIdResponseSchema = postSchema
export type GetCommunityPostByIdResponse = z.infer<typeof getCommunityPostByIdResponseSchema>

// /community/posts/{postId}/comments 댓글달기
export const postCommunityCommentPathSchema = z.object({
  postId: z.number(),
})
export type PostCommunityCommentPath = z.infer<typeof postCommunityCommentPathSchema>
export const postCommunityCommentBodySchema = z.object({
  content: z.string(),
  parentCommentId: z.number().optional(),
})
export type PostCommunityCommentBody = z.infer<typeof postCommunityCommentBodySchema>
export const postCommunityCommentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  commentId: z.number(),
})
export type PostCommunityCommentResponse = z.infer<typeof postCommunityCommentResponseSchema>
