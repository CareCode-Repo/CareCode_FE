import * as Toggle from '@radix-ui/react-toggle'
import clsx from 'clsx'
import { forwardRef, ComponentProps, ComponentRef } from 'react'

interface ToggleChipProps extends ComponentProps<typeof Toggle.Root> {
  className?: string
}

const ToggleChip = forwardRef<ComponentRef<typeof Toggle.Root>, ToggleChipProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Toggle.Root
        ref={ref}
        className={clsx(
          'py-0.5 px-3 bg-gray-50 border border-gray-400 rounded-3xl text-gray-700 text-b1-medium transition-colors',
          'data-[state=on]:border-green-900 data-[state=on]:bg-gray-50 data-[state=on]:text-green-900',
          className,
        )}
        {...props}
      >
        {children}
      </Toggle.Root>
    )
  },
)

ToggleChip.displayName = 'ToggleChip'
export default ToggleChip
