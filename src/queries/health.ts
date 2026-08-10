import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { getAccessToken, getUserId } from '@/apis/auth'
import {
  deleteAttachment,
  deleteHealthRecord,
  getAttachments,
  getHealthAlerts,
  getHealthRecord,
  getHealthRecordsByType,
  getUserHealthRecords,
  postHealthRecord,
  putHealthRecord,
  uploadAttachment,
} from '@/apis/health'
import {
  Attachment,
  CreateHealthRecordBody,
  HealthAlert,
  HealthRecord,
  RecordType,
  UpdateHealthRecordBody,
} from '@/types/apis/health'

export const healthQueries = createQueryKeys('health', {
  records: (userId: string) => ({
    queryKey: ['records', userId],
    queryFn: () => getUserHealthRecords(userId),
  }),

  recordsByType: (childId: number, recordType: RecordType) => ({
    queryKey: ['records', 'type', childId, recordType],
    queryFn: () => getHealthRecordsByType(childId, recordType),
  }),

  record: (recordId: number) => ({
    queryKey: ['record', recordId],
    queryFn: () => getHealthRecord(recordId),
  }),

  attachments: (recordId: number) => ({
    queryKey: ['attachments', recordId],
    queryFn: () => getAttachments(recordId),
  }),

  alerts: (userId: string) => ({
    queryKey: ['alerts', userId],
    queryFn: () => getHealthAlerts(userId),
  }),
})

/** 내 건강기록 전체. userId 는 로그인 시 저장한 값을 쓴다. */
export const useMyHealthRecords = (): UseQueryResult<HealthRecord[], Error> => {
  const userId = getUserId() ?? ''

  return useQuery({ ...healthQueries.records(userId), enabled: !!getAccessToken() && !!userId })
}

export const useHealthRecord = (recordId: number): UseQueryResult<HealthRecord, Error> =>
  useQuery({
    ...healthQueries.record(recordId),
    enabled: Number.isFinite(recordId) && recordId > 0,
  })

export const useHealthAlerts = (): UseQueryResult<HealthAlert[], Error> => {
  const userId = getUserId() ?? ''

  return useQuery({ ...healthQueries.alerts(userId), enabled: !!getAccessToken() && !!userId })
}

export const useAttachments = (recordId: number): UseQueryResult<Attachment[], Error> =>
  useQuery({
    ...healthQueries.attachments(recordId),
    enabled: Number.isFinite(recordId) && recordId > 0,
  })

/**
 * 건강기록 생성.
 * 키·몸무게가 성장 곡선의 입력이므로 해당 아이의 성장 캐시도 함께 무효화한다.
 */
export const useCreateHealthRecord = (): UseMutationResult<
  HealthRecord,
  Error,
  CreateHealthRecordBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postHealthRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health', 'records'] })
      queryClient.invalidateQueries({ queryKey: ['child', 'growth'] })
    },
  })
}

export const useUpdateHealthRecord = (
  recordId: number,
): UseMutationResult<HealthRecord, Error, UpdateHealthRecordBody> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateHealthRecordBody) => putHealthRecord(recordId, body),
    onSuccess: (record) => {
      queryClient.setQueryData(healthQueries.record(recordId).queryKey, record)
      queryClient.invalidateQueries({ queryKey: ['health', 'records'] })
      queryClient.invalidateQueries({ queryKey: ['child', 'growth'] })
    },
  })
}

export const useDeleteHealthRecord = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteHealthRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health', 'records'] })
      queryClient.invalidateQueries({ queryKey: ['child', 'growth'] })
    },
  })
}

export const useUploadAttachment = (
  recordId: number,
): UseMutationResult<Attachment, Error, { file: File; description?: string }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ file, description }) => uploadAttachment(recordId, file, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: healthQueries.attachments(recordId).queryKey })
    },
  })
}

export const useDeleteAttachment = (recordId: number): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: healthQueries.attachments(recordId).queryKey })
    },
  })
}
