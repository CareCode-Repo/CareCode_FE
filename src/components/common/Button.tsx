import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'large' | 'small'
  color: 'green' | 'gray' | 'red'
  className?: string
}

const Button = ({
  children,
  size = 'large',
  color = 'green',
  className,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      className={clsx(
        'text-t1-semibold rounded-xl transition-colors focus:outline-none disabled:cursor-not-allowed',
        {
          'w-full py-4.5': size === 'large',
          'w-full px-2.5 py-3.5': size === 'small',
        },
        {
          'bg-green-600 text-gray-100 hover:bg-green-700 disabled:bg-green-200': color === 'green',
          'bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400':
            color === 'gray',
          'bg-red text-white hover:bg-red-400': color === 'red',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
