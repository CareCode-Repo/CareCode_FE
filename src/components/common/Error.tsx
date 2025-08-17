import { ReactElement } from 'react'
import Button from './Button'
import Character from '@/assets/icons/characters/error.svg'

interface ErrorProps {
  content?: string
  retryText?: string
  onRetry?: () => void
}
const Error = ({
  content = '문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
  retryText = '다시 시도하기',
  onRetry,
}: ErrorProps): ReactElement => {
  return (
    <div className="absolute inset-0 z-50 bg-gray-50 flex flex-col">
      <div className="flex flex-col grow gap-9 items-center justify-center">
        <Character className="size-40" />
        <p className="text-h3-bold text-black whitespace-pre-line text-center">{content}</p>
      </div>
      {onRetry && (
        <div className="p-6">
          <Button color="green" onClick={onRetry}>
            {retryText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Error
