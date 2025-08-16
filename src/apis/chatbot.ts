import {
  GetChatMessagesQuery,
  getChatMessagesQuerySchema,
  getChatMessagesResponseSchema,
  GetChatSessionsQuery,
  getChatSessionsQuerySchema,
  getChatSessionsResponseSchema,
  PostChatMessageBody,
  postChatMessageBodySchema,
  postChatMessageResponseSchema,
} from '@/types/apis/chatbot'
import { CareCode } from './interceptor'

export const postChatMessage = async (body: PostChatMessageBody) => {
  const parsedBody = postChatMessageBodySchema.parse(body)
  const res = await CareCode.post('/chatbot/chat', parsedBody)
  return postChatMessageResponseSchema.parse(res.data)
}

export const getChatMessages = async (query: GetChatMessagesQuery) => {
  const parsedQuery = getChatMessagesQuerySchema.parse(query)
  const res = await CareCode.get(`/chatbot/history`, {
    params: parsedQuery,
  })
  return getChatMessagesResponseSchema.parse(res.data)
}

export const getChatSessions = async (query: GetChatSessionsQuery) => {
  const parsedQuery = getChatSessionsQuerySchema.parse(query)
  const res = await CareCode.get('/chatbot/sessions', {
    params: parsedQuery,
  })
  return getChatSessionsResponseSchema.parse(res.data)
}
