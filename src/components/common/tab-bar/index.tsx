'use client'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'
import { TabItem } from './TabItem'

import PolicyIcon from '@/assets/icons/book.svg'
import BuildingIcon from '@/assets/icons/building.svg'
import HomeIcon from '@/assets/icons/home.svg'
import CommunityIcon from '@/assets/icons/leaf.svg'
import UserIcon from '@/assets/icons/user.svg'

/**
 * 하단 탭. 여기 있는 경로는 모두 `(with-tabs)` 그룹 안에 있어야 한다.
 * 그룹 밖 경로를 넣으면 그 탭을 누르는 순간 탭 바 자체가 사라진다.
 */
/*
 * 탭은 이 서비스가 무엇을 하는 곳인지 말한다. 예전에는 커뮤니티·챗봇이 다섯 중 둘을 차지하고
 * 정작 지원금과 어린이집은 탭에 없어서, 홈의 아이콘 줄을 거쳐야만 갈 수 있었다.
 * 챗봇은 탭에서 내리고 홈의 진입점으로 남긴다(전체 화면 대화라 탭 바가 필요 없다).
 */
const tabData = [
  { title: '홈', icon: HomeIcon, url: '/home' },
  { title: '지원금', icon: PolicyIcon, url: '/search' },
  { title: '어린이집', icon: BuildingIcon, url: '/facility' },
  { title: '커뮤니티', icon: CommunityIcon, url: '/community' },
  { title: '마이', icon: UserIcon, url: '/mypage' },
]

export interface TabBarProps {
  className?: string
}

const TabBar = ({ className }: TabBarProps): ReactElement => {
  const pathname = usePathname() ?? ''

  /**
   * 활성 탭은 경로에서 곧바로 파생한다.
   * state + useEffect 로 맞추면 첫 렌더에 항상 첫 탭이 켜졌다가 뒤늦게 바뀐다.
   * 하위 경로(`/community/write` 등)도 해당 탭을 활성으로 본다.
   */
  const isActive = (url: string): boolean => pathname === url || pathname.startsWith(`${url}/`)

  return (
    <nav
      aria-label="주요 메뉴"
      className={clsx(
        'z-10 w-full rounded-t-2xl bg-white px-6 py-3 shadow-[0_-2px_8px_0_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <ul className="flex w-full gap-2">
        {tabData.map((item) => (
          <TabItem key={item.url} {...item} selected={isActive(item.url)} />
        ))}
      </ul>
    </nav>
  )
}

export default TabBar
