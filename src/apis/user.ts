import { CareCode } from './interceptor'
import {
  GetProfileCompletionResponse,
  getProfileCompletionResponseSchema,
  GetUserInfoResponse,
  getUserInfoResponseSchema,
  PatchNicknameBody,
  patchNicknameBodySchema,
  PutUserInfoBody,
  putUserInfoBodySchema,
  PutUserInfoResponse,
  putUserInfoResponseSchema,
} from '@/types/apis/user'

// GET /users/profile - 현재 로그인한 사용자 프로필
export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const res = await CareCode.get('/users/profile')
  return getUserInfoResponseSchema.parse(res.data)
}

// PUT /users/profile - 프로필 수정
export const putUserInfo = async (body: PutUserInfoBody): Promise<PutUserInfoResponse> => {
  const parsedBody = putUserInfoBodySchema.parse(body)
  const res = await CareCode.put('/users/profile', parsedBody)
  return putUserInfoResponseSchema.parse(res.data)
}

// PATCH /users/profile/nickname - 닉네임만 변경
export const patchNickname = async (body: PatchNicknameBody): Promise<PutUserInfoResponse> => {
  const parsedBody = patchNicknameBodySchema.parse(body)
  const res = await CareCode.patch('/users/profile/nickname', parsedBody)
  return putUserInfoResponseSchema.parse(res.data)
}

// GET /users/profile/completion - 프로필 완성도
export const getProfileCompletion = async (): Promise<GetProfileCompletionResponse> => {
  const res = await CareCode.get('/users/profile/completion')
  return getProfileCompletionResponseSchema.parse(res.data)
}

// PUT /users/{userId}/location - 위치 갱신 (주변 시설 추천에 사용)
export const putUserLocation = async (
  userId: string,
  latitude: number,
  longitude: number,
): Promise<void> => {
  await CareCode.put(`/users/${userId}/location`, null, { params: { latitude, longitude } })
}

// POST /auth/logout - 서버의 리프레시 토큰 세션 폐기
export const postLogout = async (): Promise<void> => {
  await CareCode.post('/auth/logout')
}
