import { PutUserInfoBody, PutUserInfoBodySchema } from '@/types/apis/user'
import { CareCode } from './interceptor'

// /auth/me
export const getUserInfo = async () => {
  await CareCode.get('/auth/me')
}

// /users/profile
export const putUserInfo = async (body: PutUserInfoBody) => {
  const parsedBody = PutUserInfoBodySchema.parse(body)
  await CareCode.put('/users/profile', parsedBody)
}
