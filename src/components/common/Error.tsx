import clsx from 'clsx'
import { ReactElement } from 'react'
import Button from './Button'
import Character from '@/assets/icons/characters/error.svg'

interface ErrorProps {
  content?: string
  retryText?: string
  onRetry?: () => void
  /**
   * 화면 전체를 덮는 형태. 라우트 단위 오류 경계(error.tsx)처럼 화면에 남길 게 없을 때만 쓴다.
   *
   * 기본값이 전체 덮기였을 때는 목록 한 칸이 실패했을 뿐인데 상단바와 탭 바까지 가려서,
   * 사용자가 다른 탭으로 옮겨갈 수단마저 사라졌다.
   */
  fullScreen?: boolean
}

const Error = ({
  content = '문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
  retryText = '다시 시도하기',
  onRetry,
  fullScreen = false,
}: ErrorProps): ReactElement => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-6 text-center',
        fullScreen ? 'absolute inset-0 z-50 bg-gray-50 px-6' : 'px-6 py-12',
      )}
    >
      <Character className={fullScreen ? 'size-40' : 'size-28'} />
      <p className="text-t2-semibold whitespace-pre-line text-black">{content}</p>
      {onRetry && (
        /* Button 은 폭을 100% 로 잡는다. 목록 자리에서는 너무 커 보여 바깥에서 폭을 제한한다 */
        <div className="w-full max-w-56">
          <Button color="green" size="small" onClick={onRetry}>
            {retryText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Error
