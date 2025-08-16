import { CareCode } from './interceptor'
import {
  GetUserInfoResponse,
  getUserInfoResponseSchema,
  PutUserInfoBody,
  putUserInfoBodySchema,
  PutUserInfoResponse,
  putUserInfoResponseSchema,
} from '@/types/apis/user'

// /auth/me
export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const res = await CareCode.get('/auth/me')
  return getUserInfoResponseSchema.parse(res.data)
}

// /users/profile
export const putUserInfo = async (body: PutUserInfoBody): Promise<PutUserInfoResponse> => {
  const parsedBody = putUserInfoBodySchema.parse(body)
  const res = await CareCode.put('/users/profile', parsedBody)
  return putUserInfoResponseSchema.parse(res.data)
}
