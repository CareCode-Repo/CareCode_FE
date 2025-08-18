import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPolicyList } from '@/apis/policy'
import { GetPolicyListQuery, GetPolicyListResponse } from '@/types/apis/policy'

export const policyQueryKeys = createQueryKeys('policy', {
  list: (query?: GetPolicyListQuery) => [query],
  detail: (id: number) => [id],
})

export const useGetPolicyList = (
  query?: GetPolicyListQuery,
): UseQueryResult<GetPolicyListResponse, Error> => {
  return useQuery({
    queryKey: policyQueryKeys.list(query).queryKey,
    queryFn: () => getPolicyList(query || {}),
    enabled: true,
  })
}
