'use client'

import { differenceInCalendarDays } from 'date-fns'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { useSiblingOverview } from '@/queries/child'
import { useHealthAlerts } from '@/queries/health'
import { useMissedBenefits } from '@/queries/policy'
import { useProfileCompletion } from '@/queries/user'
import { useMyWaitlists } from '@/queries/waitlist'
import { useSelectedChild } from '@/stores/useSelectedChild'
import { formatDate, toDate } from '@/utils/date'
import { formatAmount } from '@/utils/money'

/**
 * 홈 첫 화면의 "지금 할 일".
 *
 * 부모가 이 앱을 여는 이유는 둘러보기 위해서가 아니라 놓친 게 없는지 확인하기 위해서다.
 * 그런데 홈이 검색창·퀵메뉴·배너로 시작해서, 정작 기한이 걸린 것들은 스크롤해야 나왔다.
 * 그래서 기한이 있는 것만 위로 끌어올린다.
 *
 * **없는 마감은 만들지 않는다.** 정책의 신청 기간은 서버에서 자유 문장(`applicationPeriod`)
 * 으로 와서 날짜를 뽑을 수 없다. 그래서 여기 올라오는 것은 날짜가 실제로 있는 것들뿐이다 —
 * 소급 신청 잔여 기간, 건강 알림의 예정일, 다음 접종일, 대기 순번, 빠진 프로필 항목.
 *
 * 날짜가 있는 것은 45일 안(또는 이미 지난 것)만 올린다 — 나머지는 아직 할 일이 아니다.
 */
type Todo = {
  id: string
  label: string
  title: string
  detail?: string
  href: string
  /** 기한이 임박했거나 이미 지난 것. 목록 위쪽에 모으고 색으로도 구분한다 */
  urgent?: boolean
}

/** 남은 날짜를 사람이 읽는 말로. 지난 것은 지났다고 말한다 */
const dueLabel = (value?: string | null): string | undefined => {
  const date = toDate(value)
  if (!date) return undefined

  const days = differenceInCalendarDays(date, new Date())
  if (days < 0) return `${formatDate(value)} · ${Math.abs(days)}일 지남`
  if (days === 0) return `${formatDate(value)} · 오늘`
  return `${formatDate(value)} · ${days}일 남음`
}

const daysLeft = (value?: string | null): number | null => {
  const date = toDate(value)
  return date ? differenceInCalendarDays(date, new Date()) : null
}

const isOverdue = (value?: string | null): boolean => (daysLeft(value) ?? 0) < 0

/*
 * 할 일에 올릴 기한의 범위. 1년 뒤 접종까지 "지금 할 일"에 올리면 목록이 달력이 되고,
 * 정작 이번 주에 해야 할 것이 묻힌다. 지난 것은 기한과 상관없이 올린다.
 */
const SOON_DAYS = 45
const isSoonOrOverdue = (value?: string | null): boolean => {
  const days = daysLeft(value)
  return days != null && days <= SOON_DAYS
}

const TodoSection = (): ReactElement => {
  const router = useRouter()
  const { selected } = useSelectedChild()
  const { data: missed, isLoading: isMissedLoading } = useMissedBenefits()
  const { data: alerts, isLoading: isAlertsLoading } = useHealthAlerts()
  const { data: overview, isLoading: isOverviewLoading } = useSiblingOverview()
  const { data: waitlists, isLoading: isWaitlistLoading } = useMyWaitlists()
  const { data: completion, isLoading: isCompletionLoading } = useProfileCompletion()

  const isLoading =
    isMissedLoading ||
    isAlertsLoading ||
    isOverviewLoading ||
    isWaitlistLoading ||
    isCompletionLoading

  const todos: Todo[] = []

  /* 1. 아직 받을 수 있는 돈. 기한이 걸려 있어 가장 먼저 본다 */
  if (missed && missed.claimableCount > 0) {
    todos.push({
      id: 'missed',
      label: '지원금',
      title: `소급 신청할 수 있는 지원금 ${missed.claimableCount}건`,
      detail: `${formatAmount(missed.claimableAmount)} · 기간이 지나면 사라져요`,
      href: '/benefits/missed',
      urgent: true,
    })
  }

  /* 2. 접종·검진 알림. 예정일이 있는 것만, 지난 것을 먼저 */
  const dueAlerts = (alerts ?? [])
    .filter((alert) => !alert.isRead && isSoonOrOverdue(alert.dueDate))
    .sort((a, b) => (toDate(a.dueDate)?.getTime() ?? 0) - (toDate(b.dueDate)?.getTime() ?? 0))
    .slice(0, 2)

  dueAlerts.forEach((alert, index) => {
    todos.push({
      id: `alert-${alert.alertId ?? index}`,
      label: '건강',
      title: alert.title ?? '확인이 필요한 건강 알림',
      detail: dueLabel(alert.dueDate),
      href: '/health',
      urgent: alert.priority === 'HIGH' || isOverdue(alert.dueDate),
    })
  })

  /* 3. 고른 아이의 다음 접종. 아이별로 흩어져 있으면 놓치기 쉽다 */
  const summary = overview?.children.find((child) => child.childId === selected?.id)
  if (
    summary?.nextVaccination &&
    summary.nextVaccinationDate &&
    isSoonOrOverdue(summary.nextVaccinationDate)
  ) {
    todos.push({
      id: 'vaccination',
      label: '접종',
      title: `${summary.name} · ${summary.nextVaccination}`,
      detail: dueLabel(summary.nextVaccinationDate),
      href: `/children/${summary.childId}`,
      urgent: isOverdue(summary.nextVaccinationDate),
    })
  }

  /* 4. 대기 중인 어린이집. 순번은 서버가 주지만 시설 이름은 목록 화면에 있다 */
  const waiting = (waitlists ?? []).filter((entry) => entry.status === 'WAITING')
  if (waiting.length > 0) {
    const bestNumber = waiting
      .map((entry) => entry.waitNumber)
      .filter((n): n is number => typeof n === 'number')
      .sort((a, b) => a - b)[0]

    todos.push({
      id: 'waitlist',
      label: '어린이집',
      title: `대기 중인 어린이집 ${waiting.length}곳`,
      detail: bestNumber != null ? `가장 앞선 순번 ${bestNumber}번` : '순번을 아직 받지 못했어요',
      href: '/mypage/waitlist',
    })
  }

  /* 5. 빠진 프로필. 주소가 없으면 지역 지원금과 가까운 시설이 아예 안 나온다 */
  if (completion && !completion.complete) {
    todos.push({
      id: 'profile',
      label: '설정',
      title: '프로필을 마저 채워주세요',
      detail: '주소를 넣으면 지역 지원금과 가까운 시설을 찾아드려요',
      href: '/mypage/edit',
    })
  }

  const sorted = [...todos].sort((a, b) => Number(b.urgent ?? false) - Number(a.urgent ?? false))

  return (
    <section aria-labelledby="todo-title" className="flex flex-col gap-2.5">
      <h2 id="todo-title" className="text-t2-semibold text-black">
        지금 할 일
      </h2>

      {isLoading ? (
        <div className="flex flex-col gap-2.5">
          {[0, 1].map((index) => (
            <div key={index} className="h-20 animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-b1-regular rounded-lg border border-gray-100 bg-white px-4 py-6 text-center text-gray-600">
          지금 챙길 것이 없어요. 새로 생기면 여기에서 먼저 알려드릴게요.
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {sorted.map((todo) => (
            <li key={todo.id}>
              <button
                type="button"
                onClick={() => router.push(todo.href)}
                className="flex w-full items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 text-left transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:outline-none"
              >
                <span
                  className={
                    todo.urgent
                      ? 'text-c1-regular bg-red shrink-0 rounded-full px-2 py-1 text-white'
                      : 'text-c1-regular shrink-0 rounded-full bg-green-50 px-2 py-1 text-green-800'
                  }
                >
                  {todo.label}
                </span>
                <span className="flex min-w-0 grow flex-col gap-0.5">
                  <span className="text-b1-semibold truncate text-gray-800">{todo.title}</span>
                  {todo.detail && (
                    <span className="text-b2-regular truncate text-gray-600">{todo.detail}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TodoSection
