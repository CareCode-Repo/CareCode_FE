import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPolicyList, getLatestPolicies } from '@/apis/policy'
import {
  GetPolicyListQuery,
  GetPolicyListResponse,
  GetLatestPoliciesResponse,
} from '@/types/apis/policy'

export const policyQueryKeys = createQueryKeys('policy', {
  list: (query?: GetPolicyListQuery) => [query],
  detail: (id: number) => [id],
  latest: () => ['latest'],
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

export const useGetLatestPolicies = (): UseQueryResult<GetLatestPoliciesResponse, Error> => {
  return useQuery({
    queryKey: policyQueryKeys.latest().queryKey,
    queryFn: () => getLatestPolicies(),
  })
}
