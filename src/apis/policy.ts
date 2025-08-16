import { CareCode } from '@/apis/interceptor'
import {
  GetPolicyListQuery,
  getPolicyListQuerySchema,
  getPolicyListResponseSchema,
  GetPolicyByIdPath,
  getPolicyByIdPathSchema,
  getPolicyByIdResponseSchema,
  GetPolicyByIdResponse,
  GetPolicyListResponse,
} from '@/types/apis/policy'

export const getPolicyList = async (query: GetPolicyListQuery): Promise<GetPolicyListResponse> => {
  const parsedQuery = getPolicyListQuerySchema.parse(query)
  const res = await CareCode.get('/policies', { params: parsedQuery })
  return getPolicyListResponseSchema.parse(res.data)
}

export const getPolicyById = async (path: GetPolicyByIdPath): Promise<GetPolicyByIdResponse> => {
  const parsedPath = getPolicyByIdPathSchema.parse(path)
  const res = await CareCode.get(`/policies/${parsedPath.policyId}`)
  return getPolicyByIdResponseSchema.parse(res.data)
}
