import clsx from 'clsx'
import { ComponentType, ReactElement } from 'react'
// 햄버거, 세팅, 알림 사이즈 32, 색 블랙

export interface IconButtonProps {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
  iconClassName?: string
  className?: string
  showBadge?: boolean
  onClick?: () => void
}

const IconButton = ({
  icon: Icon,
  className = '',
  iconClassName = '',
  showBadge,
  onClick,
}: IconButtonProps): ReactElement => {
  return (
    <button onClick={onClick} className={clsx('inline-block', className)}>
      <div className="relative">
        <Icon className={iconClassName || 'size-8 fill-black'} />
        {showBadge && <div className="absolute top-0.5 right-0.5 size-3 bg-red-500 rounded-full" />}
      </div>
    </button>
  )
}

export default IconButton
