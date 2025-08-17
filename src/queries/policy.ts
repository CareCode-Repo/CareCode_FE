import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getPolicyById, getPolicyList } from '@/apis/policy'
import { GetPolicyByIdPath, GetPolicyListQuery } from '@/types/apis/policy'

export const policyQueries = createQueryKeys('policy', {
  list: (query: GetPolicyListQuery) => ({
    queryKey: ['list', query],
    queryFn: () => getPolicyList(query),
  }),

  detail: (policyId: GetPolicyByIdPath['policyId']) => ({
    queryKey: ['detail', policyId],
    queryFn: () => getPolicyById({ policyId }),
  }),
})
