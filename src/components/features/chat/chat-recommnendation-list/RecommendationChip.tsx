import { ReactElement, ReactNode, memo } from 'react'

interface RecommendationChipProps {
  onClick?: () => void
  children?: ReactNode
}

const RecommendationChip = memo(({ onClick, children }: RecommendationChipProps): ReactElement => {
  return (
    <button
      onClick={onClick}
      className="text-left shrink-0 max-w-30 text-b2-medium text-black bg-green-100 px-3 py-1.5 border border-green-200 rounded-xl cursor-pointer whitespace-pre-wrap"
    >
      {children}
    </button>
  )
})

RecommendationChip.displayName = 'RecommendationChip'

export default RecommendationChip
