import { ReactElement } from 'react'
import { BackButton } from '../BackButton'
import IconButton, { IconButtonProps } from './IconButton'

export interface TopNavBarProps {
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
}: TopNavBarProps): ReactElement => {
  return (
    <div className="flex items-center py-4 px-5 bg-white">
      {/* back */}
      {hasBackButton && <BackButton onBackButtonClick={onBackButtonClick} />}
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
