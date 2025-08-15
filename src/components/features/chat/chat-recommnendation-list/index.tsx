import { ReactElement } from 'react'
import RecommendationChip from './RecommendationChip'

interface ChatRecommendationListProps {
  recommendations: string[]
  onRecommendationClick: (text: string) => void
}

const ChatRecommendationList = ({
  recommendations,
  onRecommendationClick,
}: ChatRecommendationListProps): ReactElement => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {recommendations.map((text, index) => (
        <RecommendationChip key={`${text}-${index}`} onClick={() => onRecommendationClick(text)}>
          {text}
        </RecommendationChip>
      ))}
    </div>
  )
}

export default ChatRecommendationList
