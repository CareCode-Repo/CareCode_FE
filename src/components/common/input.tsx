import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactElement, useState } from 'react'
import * as Label from '@radix-ui/react-label'
import WarningIcon from '@/assets/icons/warning.svg'
import clsx from 'clsx'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onError' | 'onChange'> {
  value: string
  maxLength?: number
  label?: string
  placeholder?: string
  rightIcon?: ReactElement
  type?: string
  errorText?: string
  showErrorText?: boolean
  required?: boolean
  fieldClassName?: string
  inputClassName?: string
  iconClassName?: string
  variant?: 'default' | 'rounded'
  onChange?: (value: string) => void
  onError?: (error: string) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = '',
      maxLength,
      label = '',
      placeholder = '',
      rightIcon,
      type = 'text',
      errorText = '',
      showErrorText = false,
      required = false,
      variant = 'default',
      fieldClassName = '',
      inputClassName = '',
      iconClassName = '',
      onChange,
      onError,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (maxLength && value.length > maxLength) return

      onChange?.(value)
    }

    return (
      <div className={clsx('flex flex-col')}>
        {label && (
          <Label.Root className="text-t1-semibold text-black mb-3.5">
            {label}
            {required && <span className="text-b2-medium text-red align-super ml-0.5">*</span>}
          </Label.Root>
        )}

        {/* Field */}
        <div
          className={clsx(
            'flex border items-center bg-white',
            // variant별 스타일
            {
              'rounded-md py-2 px-3': variant === 'default',
              'rounded-3xl py-2.5 px-4.5': variant === 'rounded',
            },
            // 상태별 스타일
            {
              'border-gray-400': !errorText, // 기본
              'border-red text-red': errorText, // 에러
              'focus-within:border-green-500': isFocused && !errorText, // 포커스
            },
            fieldClassName,
          )}
        >
          {/* 실제입력값 */}
          <input
            ref={ref}
            type={type}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            className={clsx(
              ' text-black focus:outline-none grow placeholder:text-gray-400 focus:caret-green-600',
              errorText && 'placeholder:text-red',
              // variant별 스타일
              {
                'text-t2-regular': variant === 'default',
                'text-b1-regular': variant === 'rounded',
              },
              inputClassName,
            )}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {/* 아이콘 */}
          {rightIcon && <span>{rightIcon}</span>}
        </div>
        {/* 에러메시지 */}
        {errorText && showErrorText && (
          <div className="flex gap-1 items-center text-red text-b1-regular mt-2.5" role="alert">
            <WarningIcon className="size-5 fill-red" />
            <p>{errorText}</p>
          </div>
        )}
      </div>
    )
  },
)

export default Input

Input.displayName = 'Input'
