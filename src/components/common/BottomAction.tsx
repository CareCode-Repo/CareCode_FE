import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

/**
 * 화면의 주요 행동을 두는 자리.
 *
 * 같은 성격의 버튼이 화면마다 다른 곳에 있었다 — 본문 흐름 안, 하단 고정, 떠 있는 동그란 버튼.
 * 그래서 "이 화면에서 뭘 하면 되는지"를 매번 다시 찾아야 했다. 목록에 무엇을 더하는 행동은
 * 이 컴포넌트로 화면 아래에 고정한다. 목록이 길어져도 자리가 변하지 않는다.
 *
 * 스크롤 컨테이너 안이 아니라 화면 기준으로 붙이므로, 마지막 항목이 가리지 않도록
 * 컨테이너 쪽에 아래 여백(pb-24)을 함께 준다.
 */
const BottomAction = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}): ReactElement => {
  return (
    <div
      className={clsx(
        'sticky bottom-0 -mx-4.5 mt-4 border-t border-gray-100 bg-white/95 px-4.5 pt-3 pb-4 backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default BottomAction
