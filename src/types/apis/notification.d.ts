import { CareCode } from '@/apis/interceptor'
import {
  GetNotificationByIdPath,
  getNotificationByIdPathSchema,
  GetNotificationByIdResponse,
  getNotificationByIdResponseSchema,
  getNotificationPreferencesResponse,
  getNotificationPreferencesResponseSchema,
  GetNotificationsQuery,
  getNotificationsQuerySchema,
  GetNotificationsResponse,
  getNotificationsResponseSchema,
  PutNotificationToReadPath,
  putNotificationToReadPathSchema,
  putNotificationToReadResponse,
  putNotificationToReadResponseSchema,
} from '@/apis/notifications'

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
): Promise<putNotificationToReadResponse> => {
  const parsedPath = putNotificationToReadPathSchema.parse(path)
  const res = await CareCode.put(`/notifications/${parsedPath.notificationId}/read`)
  return putNotificationToReadResponseSchema.parse(res.data)
}

export const getNotificationPreferences = async (): Promise<getNotificationPreferencesResponse> => {
  const res = await CareCode.get('/notification/preferences')
  return getNotificationPreferencesResponseSchema.parse(res.data)
}
