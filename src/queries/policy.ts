import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/react-query'
import { getPolicyList, getLatestPolicies, searchPolicies, getPolicyById } from '@/apis/policy'
import {
  GetPolicyListQuery,
  GetPolicyListResponse,
  GetLatestPoliciesResponse,
  PolicySearchRequestDto,
  PolicySearchResponseDto,
  GetPolicyByIdResponse,
} from '@/types/apis/policy'

export const policyQueryKeys = createQueryKeys('policy', {
  list: (query?: GetPolicyListQuery) => [query],
  detail: (id: number) => [id],
  latest: () => ['latest'],
  search: (searchParams: Omit<PolicySearchRequestDto, 'page' | 'size'>) => [searchParams],
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

export const useGetPolicyById = (
  policyId: number,
): UseQueryResult<GetPolicyByIdResponse, Error> => {
  return useQuery({
    queryKey: policyQueryKeys.detail(policyId).queryKey,
    queryFn: () => getPolicyById({ policyId }),
    enabled: !!policyId,
  })
}

export const useGetLatestPolicies = (): UseQueryResult<GetLatestPoliciesResponse, Error> => {
  return useQuery({
    queryKey: policyQueryKeys.latest().queryKey,
    queryFn: () => getLatestPolicies(),
  })
}

export const useSearchPolicies = (
  searchParams: Omit<PolicySearchRequestDto, 'page' | 'size'>,
): UseInfiniteQueryResult<InfiniteData<PolicySearchResponseDto>, Error> => {
  return useInfiniteQuery({
    queryKey: policyQueryKeys.search(searchParams).queryKey,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) =>
      await searchPolicies({
        ...searchParams,
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage: PolicySearchResponseDto) =>
      lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    enabled: !!searchParams.keyword,
  })
}
