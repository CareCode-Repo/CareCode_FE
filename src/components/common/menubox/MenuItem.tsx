import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { ComponentType, ReactElement, SVGProps } from 'react'

interface MenuItemProps {
  content: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  variant?: 'default' | 'destructive'
  onSelect?: () => void
}

const MenuItem = ({
  content,
  icon: Icon,
  variant = 'default',
  onSelect,
}: MenuItemProps): ReactElement => {
  return (
    <DropdownMenu.Item
      className={clsx(
        'text-b1-regular flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer focus:outline-none focus:bg-gray-100',
        variant === 'destructive' && 'text-red',
      )}
      onSelect={onSelect}
    >
      {Icon && (
        <Icon
          className={clsx(
            'w-4 h-4',
            variant === 'destructive' && 'fill-red',
            variant === 'default' && 'fill-black',
          )}
        />
      )}
      <span>{content}</span>
    </DropdownMenu.Item>
  )
}

export default MenuItem
export type { MenuItemProps }
