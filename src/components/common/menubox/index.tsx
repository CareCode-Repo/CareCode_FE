import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactElement, ReactNode } from 'react'
import MenuItem, { MenuItemProps } from './MenuItem'

interface MenuboxProps {
  triggerButton: ReactNode
  items: MenuItemProps[]
  sideOffset?: number
  align?: 'center' | 'end' | 'start' | undefined
  alignOffset?: number
}

export const Menubox = ({
  triggerButton,
  items,
  sideOffset = 4,
  align = 'end',
  alignOffset = 0,
}: MenuboxProps): ReactElement => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{triggerButton}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white border border-gray-300 rounded-md shadow-md p-1.5 min-w-32 z-50"
          side="bottom"
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
        >
          {items.map((item, idx) => (
            <MenuItem key={`${item.content}-${idx}`} {...item} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
