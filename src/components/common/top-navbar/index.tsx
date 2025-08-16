import { useRouter } from 'next/navigation'
import IconButton, { IconButtonProps } from './IconButton'
import BackIcon from '@/assets/icons/arrow_left.svg'

interface TopNavBarProps {
  title?: string
  actionButtons?: IconButtonProps[]
  hasBackButton?: boolean
  onBackButtonClick?: () => void
}

const TopNavBar = ({
  title,
  actionButtons = [],
  hasBackButton = false,
  onBackButtonClick,
}: TopNavBarProps) => {
  const router = useRouter()
  const handleBackClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick() // 커스텀 동작이 있으면 그것을 실행
    } else {
      router.back() // 없으면 기본 뒤로가기
    }
  }

  return (
    <div className="flex items-center py-4 px-5 bg-white">
      {/* back */}
      {hasBackButton && (
        <IconButton icon={BackIcon} iconClassName="fill-black size-6" onClick={handleBackClick} />
      )}
      {/* title */}
      <div className="grow h-8 pl-2.5 text-h3-bold text-black content-center">{title}</div>
      {/* action buttons */}
      <div className="flex items-center gap-2.5">
        {actionButtons.map((button, index) => (
          <IconButton
            key={index}
            icon={button.icon}
            className={button.className}
            iconClassName={button.iconClassName}
            showBadge={button.showBadge}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default TopNavBar
