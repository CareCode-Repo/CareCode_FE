import { z } from 'zod'

export const postAuthorSchema = z.object({
  userId: z.string(),
  name: z.string(),
  profileImageUrl: z.string().url().optional(),
})
export type PostAuthor = z.infer<typeof postAuthorSchema>

export const postCommentSchema = z.object({
  commentId: z.number(),
  content: z.string(),
  authorName: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  likeCount: z.number(),
  isLiked: z.boolean(),
  parentCommentId: z.number().nullable(),
  replies: z.array(z.string()).default([]),
})
export type PostComment = z.infer<typeof postCommentSchema>

export const postSchema = z.object({
  postId: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  authorName: z.string(),
  authorId: z.string(),
  isAnonymous: z.boolean(),

  createdAt: z.string(),
  viewCount: z.number(),
  likeCount: z.number(),
  commentCount: z.number(),
  tags: z.array(z.string()).nullable().default([]),
  isLiked: z.boolean().optional(),
  isBookmarked: z.boolean().optional(),

  comments: z.array(postCommentSchema).optional(),
  relatedPosts: z.array(z.string()).nullable().default([]),
})
export type Post = z.infer<typeof postSchema>

export const postListItemSchema = z.object({
  postId: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  authorName: z.string(),
  authorId: z.string(),
  isAnonymous: z.boolean(),
  createdAt: z.string(),
  viewCount: z.number(),
  likeCount: z.number(),
  commentCount: z.number(),
  tags: z.array(z.string()),
  isLiked: z.boolean().optional(),
  isBookmarked: z.boolean().optional(),
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
  content: z.array(postListItemSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
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
export const postCommunityPostResponseSchema = postSchema
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
  commentId: z.number(),
  content: z.string(),
  authorName: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  likeCount: z.number(),
  isLiked: z.boolean(),
  parentCommentId: z.number().nullable(),
  replies: z.array(z.string()).default([]),
})
export type PostCommunityCommentResponse = z.infer<typeof postCommunityCommentResponseSchema>

export const putCommunityPostPathSchema = z.object({
  postId: z.number(),
})
export type PutCommunityPostPath = z.infer<typeof putCommunityPostPathSchema>
export const putCommunityPostBodySchema = postSchema
export type PutCommunityPostBody = z.infer<typeof putCommunityPostBodySchema>
export const putCommunityPostResponseSchema = postSchema
export type PutCommunityPostResponse = z.infer<typeof putCommunityPostResponseSchema>

export const deleteCommunityPostPathSchema = z.object({
  postId: z.number(),
})
export type DeleteCommunityPostPath = z.infer<typeof deleteCommunityPostPathSchema>

export const getCommunitySearchQuerySchema = z.object({
  keyword: z.string(),
  page: z.number().default(0),
  size: z.number().default(10),
})
export type GetCommunitySearchQuery = z.infer<typeof getCommunitySearchQuerySchema>
export const getCommunitySearchResponseSchema = z.object({
  content: z.array(postListItemSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
})
export type GetCommunitySearchResponse = z.infer<typeof getCommunitySearchResponseSchema>
