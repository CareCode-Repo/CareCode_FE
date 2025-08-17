import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getChatMessages, getChatSessions } from '@/apis/chatbot'
import { GetChatMessagesQuery, GetChatSessionsQuery } from '@/types/apis/chatbot'

export const chatbotQueries = createQueryKeys('chatbot', {
  sessions: (query: GetChatSessionsQuery) => ({
    queryKey: ['sessions', query],
    queryFn: () => getChatSessions(query),
  }),

  messages: (query: GetChatMessagesQuery) => ({
    queryKey: ['messages', query],
    queryFn: () => getChatMessages(query),
  }),
})
