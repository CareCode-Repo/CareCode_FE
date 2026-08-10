import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { getAccessToken } from '@/apis/auth'
import {
  getNotificationById,
  getNotificationChannels,
  getNotificationList,
  getNotificationPreferences,
  getUnreadNotifications,
  putAllNotificationsToRead,
  putDisableAllNotifications,
  putNotificationChannel,
  postPushToken,
  putNotificationToRead,
  putResetNotificationPreferences,
  trackNotificationOpen,
} from '@/apis/notification'
import { requestPushToken } from '@/apis/push'
import {
  GetNotificationByIdPath,
  GetNotificationByIdResponse,
  GetNotificationChannelsResponse,
  GetNotificationPreferencesResponse,
  GetNotificationsResponse,
  NotificationPreference,
  PutNotificationChannelBody,
} from '@/types/apis/notification'

export const notificationQueries = createQueryKeys('notification', {
  list: () => ({
    queryKey: ['list'],
    queryFn: getNotificationList,
  }),

  unread: () => ({
    queryKey: ['unread'],
    queryFn: getUnreadNotifications,
  }),

  detail: (notificationId: GetNotificationByIdPath['notificationId']) => ({
    queryKey: ['detail', notificationId],
    queryFn: () => getNotificationById({ notificationId }),
  }),

  preferences: () => ({
    queryKey: ['preferences'],
    queryFn: getNotificationPreferences,
  }),

  channels: () => ({
    queryKey: ['channels'],
    queryFn: getNotificationChannels,
  }),
})

export const useNotifications = (): UseQueryResult<GetNotificationsResponse, Error> =>
  useQuery({ ...notificationQueries.list(), enabled: !!getAccessToken() })

export const useUnreadNotifications = (): UseQueryResult<GetNotificationsResponse, Error> =>
  useQuery({ ...notificationQueries.unread(), enabled: !!getAccessToken() })

export const useNotificationDetail = (
  notificationId: number,
): UseQueryResult<GetNotificationByIdResponse, Error> =>
  useQuery({
    ...notificationQueries.detail(notificationId),
    enabled: Number.isFinite(notificationId) && notificationId > 0,
  })

export const useNotificationPreferences = (): UseQueryResult<
  GetNotificationPreferencesResponse,
  Error
> => useQuery({ ...notificationQueries.preferences(), enabled: !!getAccessToken() })

/**
 * 채널 가용 여부.
 *
 * 서버 설정뿐 아니라 이 사용자의 수신처(이메일·전화번호·등록된 기기)에 따라 달라진다.
 * 기기를 등록하면 바로 바뀌므로 오래 캐시하지 않는다.
 */
export const useNotificationChannels = (): UseQueryResult<GetNotificationChannelsResponse, Error> =>
  useQuery({ ...notificationQueries.channels(), enabled: !!getAccessToken() })

/**
 * 이 기기에서 푸시 받기.
 *
 * 권한 요청은 사용자가 버튼을 눌렀을 때만 한다. 화면에 들어오자마자 물으면 대부분 거절하고,
 * 한 번 거절하면 브라우저 설정에서 직접 풀기 전까지 다시 물을 수 없다.
 *
 * 토큰을 못 받으면(미지원·권한 거부) 등록을 시도하지 않는다.
 */
export const useRegisterPushDevice = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const token = await requestPushToken()
      if (!token) throw new Error('이 기기에서 푸시 알림을 받을 수 없어요.')

      await postPushToken(token)
    },
    // 기기가 등록되면 푸시 채널이 사용 가능으로 바뀐다.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueries.channels().queryKey })
    },
  })
}

/** 설정 변경은 알림 목록에 영향이 없으므로 설정 쿼리만 다시 읽는다. */
const invalidatePreferences = (queryClient: ReturnType<typeof useQueryClient>): void => {
  queryClient.invalidateQueries({ queryKey: notificationQueries.preferences().queryKey })
}

export const useUpdateNotificationChannel = (): UseMutationResult<
  NotificationPreference,
  Error,
  PutNotificationChannelBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: putNotificationChannel,
    // 실패했을 때도 서버 값으로 되돌려야 화면이 실제 설정과 어긋나지 않는다.
    onSettled: () => invalidatePreferences(queryClient),
  })
}

export const useDisableAllNotifications = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: putDisableAllNotifications,
    onSettled: () => invalidatePreferences(queryClient),
  })
}

export const useResetNotificationPreferences = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: putResetNotificationPreferences,
    onSettled: () => invalidatePreferences(queryClient),
  })
}

/** 알림 목록과 미읽음 배지를 함께 갱신한다. */
const invalidateNotifications = (queryClient: ReturnType<typeof useQueryClient>): void => {
  queryClient.invalidateQueries({ queryKey: ['notification'] })
}

/**
 * 알림 열기.
 *
 * 클릭 집계와 읽음 처리를 서버가 함께 해준다. 집계가 실패해도 화면 이동은 막지 않는다
 * (trackNotificationOpen 이 오류를 삼킨다).
 */
export const useOpenNotification = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: trackNotificationOpen,
    onSettled: () => invalidateNotifications(queryClient),
  })
}

export const useMarkNotificationRead = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: number) => putNotificationToRead({ notificationId }),
    onSuccess: () => invalidateNotifications(queryClient),
  })
}

export const useMarkAllNotificationsRead = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: putAllNotificationsToRead,
    onSuccess: () => invalidateNotifications(queryClient),
  })
}
