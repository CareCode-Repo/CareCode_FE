import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { clearTokens, getAccessToken } from '@/apis/auth'
import {
  getProfileCompletion,
  getUserInfo,
  patchNickname,
  postLogout,
  putUserInfo,
} from '@/apis/user'
import {
  GetProfileCompletionResponse,
  GetUserInfoResponse,
  PatchNicknameBody,
  PutUserInfoBody,
  PutUserInfoResponse,
} from '@/types/apis/user'

export const userQueries = createQueryKeys('user', {
  profile: () => ({
    queryKey: ['profile'],
    queryFn: getUserInfo,
  }),

  completion: () => ({
    queryKey: ['completion'],
    queryFn: getProfileCompletion,
  }),
})

export const useUserProfile = (): UseQueryResult<GetUserInfoResponse, Error> => {
  return useQuery({
    ...userQueries.profile(),
    enabled: !!getAccessToken(), // 토큰이 있을 때만 실행
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분간 fresh
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
  })
}

export const useProfileCompletion = (): UseQueryResult<GetProfileCompletionResponse, Error> => {
  return useQuery({
    ...userQueries.completion(),
    enabled: !!getAccessToken(),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateProfile = (): UseMutationResult<
  PutUserInfoResponse,
  Error,
  PutUserInfoBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: putUserInfo,
    onSuccess: (updated) => {
      queryClient.setQueryData(userQueries.profile().queryKey, updated)
      queryClient.invalidateQueries({ queryKey: userQueries.completion().queryKey })
    },
  })
}

export const useUpdateNickname = (): UseMutationResult<
  PutUserInfoResponse,
  Error,
  PatchNicknameBody
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchNickname,
    onSuccess: (updated) => {
      queryClient.setQueryData(userQueries.profile().queryKey, updated)
    },
  })
}

/**
 * 서버 세션 폐기 → 로컬 토큰 삭제 → 로그인 화면 이동.
 * 서버 호출이 실패해도 로컬 토큰은 반드시 지운다.
 */
export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: postLogout,
    onSettled: () => {
      clearTokens()
      queryClient.clear()
      router.replace('/')
    },
  })
}
