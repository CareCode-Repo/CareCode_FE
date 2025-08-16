import { CareCode } from './interceptor'
import {
  GetChatMessagesQuery,
  getChatMessagesQuerySchema,
  GetChatMessagesResponse,
  getChatMessagesResponseSchema,
  GetChatSessionsQuery,
  getChatSessionsQuerySchema,
  GetChatSessionsResponse,
  getChatSessionsResponseSchema,
  PostChatMessageBody,
  postChatMessageBodySchema,
  PostChatMessageResponse,
  postChatMessageResponseSchema,
} from '@/types/apis/chatbot'

export const postChatMessage = async (
  body: PostChatMessageBody,
): Promise<PostChatMessageResponse> => {
  const parsedBody = postChatMessageBodySchema.parse(body)
  const res = await CareCode.post('/chatbot/chat', parsedBody)
  return postChatMessageResponseSchema.parse(res.data)
}

export const getChatMessages = async (
  query: GetChatMessagesQuery,
): Promise<GetChatMessagesResponse> => {
  const parsedQuery = getChatMessagesQuerySchema.parse(query)
  const res = await CareCode.get(`/chatbot/history`, {
    params: parsedQuery,
  })
  return getChatMessagesResponseSchema.parse(res.data)
}

export const getChatSessions = async (
  query: GetChatSessionsQuery,
): Promise<GetChatSessionsResponse> => {
  const parsedQuery = getChatSessionsQuerySchema.parse(query)
  const res = await CareCode.get('/chatbot/sessions', {
    params: parsedQuery,
  })
  return getChatSessionsResponseSchema.parse(res.data)
}
