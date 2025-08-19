import { z } from 'zod'

// /chatbot/chat 챗봇 채팅: 메세지 보내고 결과 받음
export const postChatMessageBodySchema = z.object({
  userId: z.string(),
  message: z.string(),
  sessionId: z.string().optional(),
  childAge: z.number().optional(),
  context: z.string().optional(),
})
export type PostChatMessageBody = z.infer<typeof postChatMessageBodySchema>
export const postChatMessageResponseSchema = z.object({
  messageId: z.number(),
  response: z.string(),
  intentType: z.string(),
  confidence: z.number(),
  sessionId: z.string(),
  timestamp: z.string(),
  // suggestion: z.array(z.string()),
  // relatedTopics: z.array(z.string()),
  // sessionId: z.string(),
  // createdAt: z.string(),
})
export type PostChatMessageResponse = z.infer<typeof postChatMessageResponseSchema>

// /chatbot/history 해당 세션의 챗봇 메세지 기록 조회
export const getChatMessagesQuerySchema = z.object({
  userId: z.string(),
  sessionId: z.string().optional(),
  page: z.string().optional(),
  size: z.string().optional(),
})
export type GetChatMessagesQuery = z.infer<typeof getChatMessagesQuerySchema>
export const getChatMessagesResponseSchema = z.object({
  success: z.boolean(),
  content: z.object({
    messageId: z.number(),
    userMessage: z.string(),
    botResponse: z.string(),
    confidence: z.number(),
    isHelpful: z.boolean(),
    sessionId: z.string(),
    createAt: z.string(),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  }),
})
export type GetChatMessagesResponse = z.infer<typeof getChatMessagesResponseSchema>

// /chatbot/history 해당 세션의 챗봇 메세지 기록 조회
export const getChatHistoryQuerySchema = z.object({
  userId: z.string(),
  sessionId: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type GetChatHistoryQuery = z.infer<typeof getChatHistoryQuerySchema>
export const getChatHistoryResponseSchema = z.object({
  messageId: z.number(),
  message: z.string(),
  response: z.string(),
  messageType: z.string(),
  intentType: z.string(),
  confidence: z.number(),
  sessionId: z.string(),
  isHelpful: z.boolean(),
  createdAt: z.string(),
})
export const GetChatHistoryResponseSchema = z.array(getChatHistoryResponseSchema)
export type GetChatHistoryResponse = z.infer<typeof getChatHistoryResponseSchema>

// /chatbot/sessions 챗봇 대화 리스트 가져오기
export const getChatSessionsQuerySchema = z.object({
  userId: z.string(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type GetChatSessionsQuery = z.infer<typeof getChatSessionsQuerySchema>
export const sessionResponseSchema = z.object({
  sessionId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  messageCount: z.number(),
  lastActivityAt: z.string(),
  createdAt: z.string(),
  // sessionId: z.string(),
  // userId: z.string(),
  // title: z.string(),
  // description: z.string(),
  // status: z.string(),
  // messageCount: z.number(),
  // lastActivityAt: z.string(),
  // createAt: z.string(),
})
export const getChatSessionsResponseSchema = z.array(sessionResponseSchema)
export type GetChatSessionsResponse = z.infer<typeof getChatSessionsResponseSchema>
