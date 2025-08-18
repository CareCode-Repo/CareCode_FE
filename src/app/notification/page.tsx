import { ReactElement } from 'react'
import Layout from '@/components/common/Layout'
import NotificationCard from '@/components/features/notification/NotificationCard'

const NotificationPage = (): ReactElement => {
  const notifications = [
    {
      id: 1,
      timeAgo: '10분 전',
      title: '새로운 정책이 등록되었습니다',
      content: '영유아 건강검진 지원 정책이 새롭게 등록되었습니다.\n자세한 내용을 확인해보세요.',
      isRead: false,
    },
    {
      id: 2,
      timeAgo: '1시간 전',
      title: '커뮤니티 새 댓글',
      content: '작성하신 게시글에 새로운 댓글이 달렸습니다.',
      isRead: false,
    },
  ]

  return (
    <Layout hasTopNav title="알림" hasBackButton contentClassName="px-4.5 py-6">
      {notifications.length > 0 ? (
        <ul className="flex flex-col gap-2.5">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <NotificationCard {...notification} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-b1-regular pt-22 text-center text-gray-700">알림이 없습니다.</div>
      )}
    </Layout>
  )
}

export default NotificationPage
