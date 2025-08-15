import { ReactNode } from 'react'

interface SpacerProps {
  className?: string
  children?: ReactNode
}

/**
 * 간단한 간격 컴포넌트
 */
const Spacer = ({ className, children }: SpacerProps): ReactNode => {
  return <div className={className}>{children}</div>
}

export default Spacer
