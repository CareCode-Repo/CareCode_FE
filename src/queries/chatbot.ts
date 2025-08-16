import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useMutation, useQuery, UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import { getChatMessages, getChatSessions, postChatMessage } from '@/apis/chatbot'
import {
  GetChatMessagesQuery,
  GetChatMessagesResponse,
  GetChatSessionsQuery,
  GetChatSessionsResponse,
  PostChatMessageBody,
  PostChatMessageResponse,
} from '@/types/apis/chatbot'

export const chatbotQueryKeys = createQueryKeys('chatbot', {
  messages: (query?: GetChatMessagesQuery) => [query],
  sessions: (query?: GetChatSessionsQuery) => [query],
})

export const usePostChatMessage = (): UseMutationResult<
  PostChatMessageResponse,
  Error,
  PostChatMessageBody
> => {
  return useMutation({
    mutationFn: postChatMessage,
  })
}

export const useGetChatMessages = (
  query?: GetChatMessagesQuery,
  enabled = false,
): UseQueryResult<GetChatMessagesResponse, Error> => {
  return useQuery({
    queryKey: chatbotQueryKeys.messages(query).queryKey,
    queryFn: () => {
      if (!query?.userId) {
        throw new Error('userId is required')
      }
      return getChatMessages(query)
    },
    enabled: enabled && !!query?.userId,
  })
}

export const useGetChatSessions = (
  query?: GetChatSessionsQuery,
  enabled = false,
): UseQueryResult<GetChatSessionsResponse, Error> => {
  return useQuery({
    queryKey: chatbotQueryKeys.sessions(query).queryKey,
    queryFn: () => {
      if (!query?.userId) {
        throw new Error('userId is required')
      }
      return getChatSessions(query)
    },
    enabled: enabled && !!query?.userId,
  })
}
