import { CareCode } from '@/apis/interceptor'
import {
  GetPolicyByIdPath,
  getPolicyByIdPathSchema,
  getPolicyByIdResponseSchema,
  GetPolicyListQuery,
  getPolicyListQuerySchema,
  getPolicyListResponse,
  getPolicyListResponseSchema,
} from '@/apis/policy'

export const getPolicyList = async (query: GetPolicyListQuery): Promise<getPolicyListResponse> => {
  const parsedQuery = getPolicyListQuerySchema.parse(query)
  const res = await CareCode.get('/policies', { params: parsedQuery })
  return getPolicyListResponseSchema.parse(res.data)
}

export const getPolicyById = async (path: GetPolicyByIdPath): Promise<getPolicyListResponse> => {
  const parsedPath = getPolicyByIdPathSchema.parse(path)
  const res = await CareCode.get(`/policies/{policyId}`)
  return getPolicyByIdResponseSchema.parse(res.data)
}
