'use client'

import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import ArrowDownIcon from '@/assets/icons/arrow_down.svg'
import BellIcon from '@/assets/icons/bell.svg'
import NavigationIcon from '@/assets/icons/navigation_small.svg'
import { Menubox } from '@/components/common/menubox'
import IconButton from '@/components/common/top-navbar/IconButton'
import { useHasUnreadNotifications } from '@/queries/notification'
import { useUserProfile } from '@/queries/user'
import { useSelectedChild } from '@/stores/useSelectedChild'
import { formatChildAge } from '@/utils/date'

/**
 * 탭 화면의 상단 맥락 바.
 *
 * 이 서비스의 답은 전부 "어느 아이, 어디 사는가" 에 달려 있다. 그런데 상단바가 화면 이름과
 * 종 아이콘만 보여줘서, 지원금 목록이 누구 기준인지 화면 어디에도 없었다. 기준을 상단에
 * 고정해 두면 사용자가 매번 되짚지 않아도 되고, 잘못된 기준으로 읽는 일도 막는다.
 *
 * 주소가 비어 있으면 지역 지원금과 가까운 시설 추천이 아예 동작하지 않으므로, 빈 자리를
 * 감추지 않고 "지역 설정" 버튼으로 드러낸다.
 */
const ContextBar = ({ title }: { title: string }): ReactElement => {
  const router = useRouter()
  const hasUnread = useHasUnreadNotifications()
  const { data: user } = useUserProfile()
  const { children, selected, select } = useSelectedChild()

  /* 주소는 "서울특별시 강남구 …" 로 온다. 상단 칩에는 시·구까지만 쓴다 */
  const region = user?.address?.trim().split(/\s+/).slice(0, 2).join(' ')

  const childItems = [
    ...children.map((child) => ({
      content: `${child.name} · ${formatChildAge(child.birthDate)}`,
      onSelect: () => select(child.id),
    })),
    { content: '아이 추가하기', onSelect: () => router.push('/children/new') },
  ]

  return (
    <div className="sticky top-0 z-20 bg-white px-4.5 pt-3 pb-2.5">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-h3-bold text-black">{title}</h1>
        <IconButton
          icon={BellIcon}
          aria-label="알림"
          showBadge={hasUnread}
          onClick={() => router.push('/notification')}
        />
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {selected ? (
          <Menubox
            align="start"
            triggerButton={
              <button
                type="button"
                className="text-b1-semibold flex items-center gap-1 rounded-full bg-green-50 py-1.5 pr-2 pl-3 text-green-800 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:outline-none"
              >
                <span>{selected.name}</span>
                <span className="text-b2-regular text-green-700">
                  {formatChildAge(selected.birthDate)}
                </span>
                <ArrowDownIcon className="size-4 fill-green-700" aria-hidden />
                <span className="sr-only">아이 바꾸기</span>
              </button>
            }
            items={childItems}
          />
        ) : (
          <button
            type="button"
            onClick={() => router.push('/children/new')}
            className="text-b1-semibold rounded-full bg-green-50 px-3 py-1.5 text-green-800 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:outline-none"
          >
            아이 등록하기
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push('/mypage/edit')}
          className="text-b1-regular flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-gray-700 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:outline-none"
        >
          <NavigationIcon className="size-4 fill-gray-600" aria-hidden />
          <span>{region || '지역 설정'}</span>
        </button>
      </div>
    </div>
  )
}

export default ContextBar
