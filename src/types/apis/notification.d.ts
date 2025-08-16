import { z } from 'zod'

export const notificationMetadataSchema = z.object({
  vaccineType: z.string(),
  scheduledDate: z.string(),
})
export type NotificationMetadata = z.infer<typeof notificationSchema>

export const notificationSchema = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string(),
  type: z.string(),
  userId: z.string(),
  isRead: z.boolean(),
  priority: z.string(),
  actionUrl: z.string().optional(),
  metadata: notificationMetadataSchema.optional(),
  createdAt: z.string(),
  readAt: z.string().optional(),
})
export type Notification = z.infer<typeof notificationSchema>

export const notificationListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string(),
  type: z.string(),
  isRead: z.boolean(),
  priority: z.string(),
  actionUrl: z.string().optional(),
  createdAt: z.string(),
})
export type NotificationListItem = z.infer<typeof notificationListItemSchema>

// /notifications
export const getNotificationsQuerySchema = z.object({
  userId: z.string(),
  page: z.number().optional(),
  size: z.number().optional(),
  isRead: z.boolean().default(false),
})
export type GetNotificationsQuery = z.infer<typeof getNotificationsQuerySchema>
export const getNotificationsResponseSchema = z.array(notificationListItemSchema)
export type GetNotificationsResponse = z.infer<typeof getNotificationsResponseSchema>

// /notifications/{notificationId}
export const getNotificationByIdPathSchema = z.object({
  notificationId: z.number(),
})
export type GetNotificationByIdPath = z.infer<typeof getNotificationByIdPathSchema>
export const getNotificationByIdResponseSchema = notificationSchema
export type GetNotificationByIdResponse = z.infer<typeof getNotificationByIdResponseSchema>

// /notifications/unread

// /notifications/{notificationId}/read
export const putNotificationToReadPathSchema = z.object({
  notificationId: z.number(),
})
export type PutNotificationToReadPath = z.infer<typeof putNotificationToReadPathSchema>
export const putNotificationToReadResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
export type PutNotificationToReadResponse = z.infer<typeof putNotificationToReadResponseSchema>

export const notificationPreferencesSchema = z.object({
  emailNotification: z.boolean(),
  pushNotification: z.boolean(),
  healthRemiders: z.boolean(),
  communityUpdates: z.boolean(),
  policyUpdates: z.boolean(),
  marketingEmails: z.boolean(),
})
export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>

// /notifications/preferences
export const getNotificationPreferencesResponseSchema = z.object({
  success: z.boolean(),
  preferences: notificationPreferencesSchema,
})
export type GetNotificationPreferencesResponse = z.infer<
  typeof getNotificationPreferencesResponseSchema
>

// preference 수정 하기
