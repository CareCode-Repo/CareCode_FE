import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { ComponentType, ReactElement } from 'react'

interface TabItemProps {
  title: string
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
  url: string
  value: string // Radix는 value 기반으로 동작
  selected?: boolean
}

export const TabItem = ({
  title,
  icon: Icon,
  url,
  value,
  selected,
}: TabItemProps): ReactElement => {
  const router = useRouter()

  const handleClick = () => {
    router.push(url)
  }

  return (
    <Tabs.Trigger
      value={value}
      onClick={handleClick}
      className="flex-1 flex flex-col justify-center items-center gap-1 cursor-pointer"
    >
      <Icon className={clsx('size-8', selected ? 'fill-green-500' : 'fill-gray-700')} />
      <span className={clsx('text-c1-regular', selected ? 'text-green-600' : 'text-gray-700')}>
        {title}
      </span>
    </Tabs.Trigger>
  )
}
