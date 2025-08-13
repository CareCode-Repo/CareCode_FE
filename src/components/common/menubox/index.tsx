import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { FC, ReactElement, ReactNode, SVGProps } from 'react'

interface MenuItemProps {
  content: string
  icon?: FC<SVGProps<SVGSVGElement>>
  variant?: 'default' | 'destructive'
  onSelect?: () => void
}

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
            <DropdownMenu.Item
              key={`${item.content}-${idx}`}
              className={clsx(
                'text-b1-regular flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer focus:outline-none focus:bg-gray-100',
                item.variant === 'destructive' && 'text-red',
              )}
              onSelect={item.onSelect}
            >
              {item.icon && (
                <item.icon
                  className={clsx('w-4 h-4', item.variant === 'destructive' && 'stroke-red')}
                />
              )}
              <span>{item.content}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
