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
        'text-b1-regular flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
        variant === 'destructive' && 'text-red',
      )}
      onSelect={onSelect}
    >
      {Icon && (
        <Icon
          className={clsx(
            'h-4 w-4',
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
