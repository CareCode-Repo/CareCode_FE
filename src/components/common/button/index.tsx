import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'full' | 'small'
  color: 'green' | 'gray' | 'red'
  className?: string
}

const Button = ({ children, size = 'full', color = 'green', className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'text-t1-semibold rounded-xl transition-colors focus:outline-none disabled:cursor-not-allowed',
        {
          'w-full py-6': size === 'full',
          'w-full py-3.5': size === 'small',
        },
        {
          'bg-green-500 hover:bg-green-600 text-gray-100 disabled:bg-green-400': color === 'green',
          'bg-gray-200 hover:bg-gray-300 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400':
            color === 'gray',
          'bg-red hover:bg-red-400 text-white': color === 'red',
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
