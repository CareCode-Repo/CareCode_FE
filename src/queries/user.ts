import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getAccessToken } from '@/apis/auth'
import { getUserInfo } from '@/apis/user'
import { GetUserInfoResponse } from '@/types/apis/user'

export const userQueries = createQueryKeys('user', {
  profile: () => ({
    queryKey: ['profile'],
    queryFn: getUserInfo,
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
