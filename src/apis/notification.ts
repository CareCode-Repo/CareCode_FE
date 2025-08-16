import { CareCode } from '@/apis/interceptor'
import {
  GetNotificationsQuery,
  GetNotificationsResponse,
  getNotificationsQuerySchema,
  getNotificationsResponseSchema,
  GetNotificationByIdPath,
  GetNotificationByIdResponse,
  getNotificationByIdPathSchema,
  getNotificationByIdResponseSchema,
  PutNotificationToReadPath,
  putNotificationToReadPathSchema,
  putNotificationToReadResponseSchema,
  GetNotificationPreferencesResponse,
  getNotificationPreferencesResponseSchema,
  PutNotificationToReadResponse,
} from '@/types/apis/notification'

export const getNotificationList = async (
  query: GetNotificationsQuery,
): Promise<GetNotificationsResponse> => {
  const parsedQuery = getNotificationsQuerySchema.parse(query)
  const res = await CareCode.get('/notifications', { params: query })
  return getNotificationsResponseSchema.parse(res.data)
}

export const getNotificationById = async (
  path: GetNotificationByIdPath,
): Promise<GetNotificationByIdResponse> => {
  const parsedPath = getNotificationByIdPathSchema.parse(path)
  const res = await CareCode.get(`/notifications/${parsedPath.notificationId}`)
  return getNotificationByIdResponseSchema.parse(res.data)
}

export const putNotificationToRead = async (
  path: PutNotificationToReadPath,
): Promise<PutNotificationToReadResponse> => {
  const parsedPath = putNotificationToReadPathSchema.parse(path)
  const res = await CareCode.put(`/notifications/${parsedPath.notificationId}/read`)
  return putNotificationToReadResponseSchema.parse(res.data)
}

export const getNotificationPreferences = async (): Promise<GetNotificationPreferencesResponse> => {
  const res = await CareCode.get('/notification/preferences')
  return getNotificationPreferencesResponseSchema.parse(res.data)
}
