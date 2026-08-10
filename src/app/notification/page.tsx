'use client'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import AuthGuard from '@/components/common/AuthGuard'
import EmptyState from '@/components/common/EmptyState'
import ErrorView from '@/components/common/Error'
import Layout from '@/components/common/Layout'
import NotificationCard from '@/components/features/notification/NotificationCard'
import { useNotifications, useOpenNotification } from '@/queries/notification'
import { useMarkAllNotificationsRead } from '@/queries/notification'
import { Notification, NOTIFICATION_TARGET } from '@/types/apis/notification'
import { toDate } from '@/utils/date'

/** "10분 전" 형태. 날짜가 없거나 형식이 깨지면 표시를 비운다. */
const formatTimeAgo = (value?: string | null): string => {
  const date = toDate(value)
  if (!date) return ''
  return formatDistanceToNow(date, { addSuffix: true, locale: ko })
}

const NotificationPage = (): ReactElement => {
  const router = useRouter()
  const { data: notifications = [], isLoading, isError, refetch } = useNotifications()
  const { mutate: openNotification } = useOpenNotification()
  const { mutate: markAllRead, isPending: isMarkingAll } = useMarkAllNotificationsRead()

  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  const handleClick = (notification: Notification) => {
    // 서버가 클릭을 집계하고 읽음 처리한다. 이동은 앱 안에서 우리가 한다.
    openNotification(notification.id)

    const target = notification.notificationType
      ? NOTIFICATION_TARGET[notification.notificationType]
      : undefined
    if (target) router.push(target)
  }

  return (
    <AuthGuard>
      <Layout hasTopNav title="알림" hasBackButton contentClassName="px-4.5 py-6">
        {/* 알림이 없거나 불러오지 못했을 때도 설정으로는 갈 수 있어야 한다. */}
        <div className="flex justify-end pb-3">
          <Link href="/notification/settings" className="text-b2-semibold text-gray-600 underline">
            알림 설정
          </Link>
        </div>

        {isLoading ? (
          <ul className="flex flex-col gap-2.5">
            {[0, 1, 2].map((i) => (
              <li key={i} className="h-28 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </ul>
        ) : isError ? (
          <ErrorView content="알림을 불러오지 못했어요." onRetry={() => refetch()} />
        ) : !notifications.length ? (
          <EmptyState
            title="알림이 없어요"
            description={'예방접종 일정이나 지원금 마감이 다가오면\n여기로 알려드려요.'}
          />
        ) : (
          <>
            {unreadCount > 0 && (
              <div className="flex items-center justify-between pb-3">
                <span className="text-b2-regular text-gray-600">{`안 읽은 알림 ${unreadCount}개`}</span>
                <button
                  type="button"
                  onClick={() => markAllRead()}
                  disabled={isMarkingAll}
                  className="text-b2-semibold text-green-700 underline disabled:opacity-50"
                >
                  모두 읽음
                </button>
              </div>
            )}

            <ul className="flex flex-col gap-2.5">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <NotificationCard
                    timeAgo={formatTimeAgo(notification.createdAt)}
                    title={notification.title ?? '알림'}
                    content={notification.message ?? ''}
                    isRead={notification.isRead}
                    onClick={() => handleClick(notification)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </Layout>
    </AuthGuard>
  )
}

export default NotificationPage
