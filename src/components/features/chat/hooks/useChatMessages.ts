import { useCallback } from 'react'
import { usePostChatMessage } from '@/queries/chatbot'
import { useChatStore } from '@/stores/useChatStore'
import { PostChatMessageBody, PostChatMessageResponse } from '@/types/apis/chatbot'
import { ChatMessage, SendMessageOptions, UseChatMessagesReturn } from '@/types/chat'

export const useChatMessages = (): UseChatMessagesReturn => {
  const { messages, currentSessionId, addMessage, updateMessage, setSessionId } = useChatStore()

  // TODO: useRecommendationStore로 분리 예정 - 임시 더미 데이터
  const recommendations = [
    '최근 육아정책',
    '육아 꿀템을\n추천해줘',
    '태교에 좋은\n노래 추천해줘',
    '육아 관련 책\n추천해줘',
    '아이 발달\n단계별 놀이',
  ]

  // 메시지 전송 Mutation
  const sendMessageMutation = usePostChatMessage()

  // Mutation 성공/에러 처리를 위한 변수
  const handleMutationSuccess = useCallback(
    (
      response: PostChatMessageResponse,
      variables: SendMessageOptions & { loadingMessageId: string },
    ) => {
      // 세션 ID 저장 (첫 메시지거나 새로운 세션인 경우)
      if (!currentSessionId && response.sessionId) {
        setSessionId(response.sessionId)
      }

      // API 응답을 내부 타입으로 변환하여 사용
      // const messageUpdates = convertApiResponseToMessage(response)
      const messageUpdates: Partial<ChatMessage> = {
        message: response.response,
        timestamp: response.timestamp,
        isMyMessage: false,
      }
      updateMessage(variables.loadingMessageId, messageUpdates)
    },
    [updateMessage, currentSessionId, setSessionId],
  )

  const handleMutationError = useCallback(
    (error: Error, variables: SendMessageOptions & { loadingMessageId: string }) => {
      console.error('Chat error:', error)

      // 에러 유형별 메시지 제공
      let errorMessage = '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'

      if (error.message.includes('Network')) {
        errorMessage = '네트워크 연결을 확인해주세요. 인터넷 연결이 불안정합니다.'
      } else if (error.message.includes('timeout')) {
        errorMessage = '응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.'
      } else if (error.message.includes('401')) {
        errorMessage = '인증이 만료되었습니다. 다시 로그인해주세요.'
      } else if (error.message.includes('500')) {
        errorMessage = '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }

      // 로딩 메시지를 에러 메시지로 교체
      updateMessage(variables.loadingMessageId, {
        message: errorMessage,
      })
    },
    [updateMessage],
  )

  // 메시지 전송 함수
  const sendMessage = useCallback(
    async (options: SendMessageOptions) => {
      if (!options.message.trim() || sendMessageMutation.isPending) return

      // 사용자 메시지 추가
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        message: options.message,
        isMyMessage: true,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)

      // 로딩 메시지 추가
      const loadingMessageId = `loading-${Date.now()}`
      const loadingMessage: ChatMessage = {
        id: loadingMessageId,
        message: '챗봇이 입력 중...',
        isMyMessage: false,
        timestamp: new Date().toISOString(),
      }
      addMessage(loadingMessage)

      // API 호출 - 조건부로 sessionId 포함
      const body: PostChatMessageBody = {
        userId: options.userId,
        message: options.message,
        ...(currentSessionId && { sessionId: currentSessionId }),
      }

      try {
        const response = await sendMessageMutation.mutateAsync(body)
        handleMutationSuccess(response, { ...options, loadingMessageId })
      } catch (error) {
        handleMutationError(error as Error, { ...options, loadingMessageId })
      }
    },
    [sendMessageMutation, addMessage, handleMutationSuccess, handleMutationError, currentSessionId],
  )

  return {
    messages,
    recommendations,
    sendMessage,
    isSending: sendMessageMutation.isPending,
  }
}
