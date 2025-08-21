import { CareCode } from './interceptor'
import { GetUserInfoResponse, getUserInfoResponseSchema } from '@/types/apis/user'

// /api/user/profile
export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const res = await CareCode.get('/api/user/profile')
  return getUserInfoResponseSchema.parse(res.data)
}
