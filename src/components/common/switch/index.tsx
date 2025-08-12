import { Switch as RadixSwitch } from 'radix-ui'
import { forwardRef } from 'react'
import clsx from 'clsx'

interface SwitchProps extends React.ComponentProps<typeof RadixSwitch.Root> {
  className?: string
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({ className, ...props }, ref) => {
  return (
    <RadixSwitch.Root
      ref={ref}
      className={clsx(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none',
        'data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadixSwitch.Thumb className="block h-5 w-5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
    </RadixSwitch.Root>
  )
})

Switch.displayName = 'Switch'
export default Switch
