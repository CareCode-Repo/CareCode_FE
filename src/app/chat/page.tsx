'use client'
import { motion } from 'motion/react'
import { ReactElement, useCallback, useState } from 'react'
// import HamburgerIcon from '@/assets/icons/hamburger.svg'
import TopNavBar from '@/components/common/top-navbar'
import ChatContainer from '@/components/features/chat/ChatContainer'
import ChatInput from '@/components/features/chat/ChatInput'
import ChatRecommendationList from '@/components/features/chat/chat-recommnendation-list'
import { useChatMessages } from '@/components/features/chat/hooks/useChatMessages'

const Chat = (): ReactElement => {
  const { messages, recommendations, sendMessage, isSending } = useChatMessages()
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || isSending) return

    sendMessage({
      message: inputValue,
      userId: 'test-user-id',
    })
    setInputValue('')
  }, [inputValue, isSending, sendMessage])

  // 추천 메시지 클릭 핸들러
  const handleRecommendationClick = useCallback(
    (text: string) => {
      sendMessage({
        message: text,
        userId: 'test-user-id',
      })
    },
    [sendMessage],
  )

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <TopNavBar
        title="챗봇 상담"
        hasBackButton
        // actionButtons={[{ icon: HamburgerIcon }]}
      />

      <div className="flex flex-1 flex-col overflow-hidden px-5 pb-5">
        <ChatContainer messages={messages} />
        <div className="flex flex-col gap-3">
          {/* 추천 메시지 리스트 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatRecommendationList
              recommendations={recommendations}
              onRecommendationClick={handleRecommendationClick}
            />
          </motion.div>

          {/* 메시지 입력 영역 */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            disabled={isSending}
            placeholder={isSending ? '전송 중...' : '메시지를 입력하세요...'}
          />
        </div>
      </div>
    </div>
  )
}

export default Chat
