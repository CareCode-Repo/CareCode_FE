'use client'
import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { TabItem } from './TabItem'

import SearchIcon from '@/assets/icons/book.svg'
import ChatIcon from '@/assets/icons/chat.svg'
import HomeIcon from '@/assets/icons/home.svg'
import CommunityIcon from '@/assets/icons/leaf.svg'
import UserIcon from '@/assets/icons/user.svg'

const tabData = [
  { id: 1, title: '커뮤니티', icon: CommunityIcon, url: '/community' },
  { id: 2, title: '육아 정보', icon: SearchIcon, url: '/search' },
  { id: 3, title: '홈', icon: HomeIcon, url: '/home' },
  { id: 4, title: '챗봇 상담', icon: ChatIcon, url: '/chat' },
  { id: 5, title: '마이페이지', icon: UserIcon, url: '/mypage' },
]

export interface TabBarProps {
  defaultIndex?: number
  className?: string
  onChange?: (index: number) => void
}

const TabBar = ({ defaultIndex = 0, onChange, className }: TabBarProps): ReactElement => {
  const pathname = usePathname()
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  useEffect(() => {
    const currentPath = pathname
    const currentIndex = tabData.findIndex((tab) => tab.url === currentPath)
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex)
    }
  }, [pathname])

  const handleValueChange = (value: string) => {
    const index = tabData.findIndex((tab) => tab.id.toString() === value)
    if (index !== -1) {
      setSelectedIndex(index)
      onChange?.(index)
    }
  }

  const currentValue = tabData[selectedIndex]?.id.toString() || tabData[0].id.toString()

  return (
    <Tabs.Root
      value={currentValue}
      onValueChange={handleValueChange}
      className={clsx(
        'w-full rounded-t-2xl bg-white shadow-[0_-2px_8px_0_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <Tabs.List className="flex w-full">
        {tabData.map((item, index) => (
          <TabItem
            key={item.id}
            {...item}
            value={item.id.toString()}
            selected={index === selectedIndex}
          />
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

export default TabBar
