import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  getNotificationById,
  getNotificationList,
  getNotificationPreferences,
} from '@/apis/notification'
import { GetNotificationByIdPath, GetNotificationsQuery } from '@/types/apis/notification'

export const notificationQueries = createQueryKeys('notification', {
  list: (query: GetNotificationsQuery) => ({
    queryKey: ['list', query],
    queryFn: () => getNotificationList(query),
  }),

  detail: (notificationId: GetNotificationByIdPath['notificationId']) => ({
    queryKey: ['detail', notificationId],
    queryFn: () => getNotificationById({ notificationId }),
  }),

  preferences: () => ({
    queryKey: ['notification'],
    queryFn: () => getNotificationPreferences(),
  }),
})
