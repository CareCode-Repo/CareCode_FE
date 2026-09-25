import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useMyChildren } from '@/queries/child'
import { Child } from '@/types/apis/child'

/**
 * 지금 보고 있는 아이.
 *
 * 이 서비스의 화면은 거의 전부 "어느 아이 기준인가" 에 따라 답이 달라진다(월령별 지원금,
 * 접종 일정, 어린이집 반). 그런데 아이 선택이 화면마다 로컬 state 로 흩어져 있어서, 화면을
 * 옮길 때마다 기준이 첫째로 되돌아가고 사용자는 무엇을 보고 있는지 알 수 없었다.
 *
 * 선택은 기기에 남긴다 — 앱을 다시 열 때마다 고르게 하면 다자녀 가구에는 매번 하는 일이 된다.
 */
type SelectedChildStore = {
  childId: number | null
  setChildId: (childId: number) => void
}

export const useSelectedChildStore = create<SelectedChildStore>()(
  persist(
    (set) => ({
      childId: null,
      setChildId: (childId) => set({ childId }),
    }),
    {
      name: 'carecode.selected-child',
      /*
       * 서버 렌더에는 localStorage 가 없다. 자동 복구를 켜두면 첫 렌더가 서버와 달라져
       * 하이드레이션이 어긋나므로, 마운트된 뒤에 아래 훅이 직접 복구한다.
       */
      skipHydration: true,
    },
  ),
)

export type SelectedChild = {
  children: Child[]
  /** 고른 아이. 고른 적이 없으면 첫째, 아이가 없으면 null */
  selected: Child | null
  select: (childId: number) => void
  isLoading: boolean
}

export const useSelectedChild = (): SelectedChild => {
  const { data, isLoading } = useMyChildren()
  const childId = useSelectedChildStore((state) => state.childId)
  const setChildId = useSelectedChildStore((state) => state.setChildId)

  useEffect(() => {
    void useSelectedChildStore.persist.rehydrate()
  }, [])

  const children = data ?? []
  /* 저장된 아이가 지워졌을 수 있다. 목록에 없으면 첫째로 되돌린다 */
  const selected = children.find((child) => child.id === childId) ?? children[0] ?? null

  return { children, selected, select: setChildId, isLoading }
}
