import { z } from 'zod'

/**
 * 서버 UserDto 대응 스키마.
 * 카카오 가입 직후에는 식별자를 제외한 대부분이 비어 있으므로 nullish 로 둔다.
 * (password 는 WRITE_ONLY 라 응답에 포함되지 않는다)
 */
export const userSchema = z.object({
  id: z.number(),
  userId: z.string(),
  email: z.string().nullish(),
  name: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  birthDate: z.string().nullish(), // date
  gender: z.string().nullish(),
  address: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  profileImageUrl: z.string().nullish(),
  role: z.string().nullish(),
  provider: z.string().nullish(),
  providerId: z.string().nullish(),
  isActive: z.boolean().nullish(),
  emailVerified: z.boolean().nullish(),
  registrationCompleted: z.boolean().nullish(),
  deletedAt: z.string().nullish(), // date-time
  lastLoginAt: z.string().nullish(), // date-time
  createdAt: z.string().nullish(), // date-time
  updatedAt: z.string().nullish(), // date-time
})
export type User = z.infer<typeof userSchema>

// GET /users/profile
export const getUserInfoResponseSchema = userSchema
export type GetUserInfoResponse = z.infer<typeof getUserInfoResponseSchema>

// PUT /users/profile
export const putUserInfoBodySchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  profileImageUrl: z.string().optional(),
})
export type PutUserInfoBody = z.infer<typeof putUserInfoBodySchema>
export const putUserInfoResponseSchema = userSchema
export type PutUserInfoResponse = z.infer<typeof putUserInfoResponseSchema>

// PATCH /users/profile/nickname
export const patchNicknameBodySchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요').max(20, '닉네임은 20자 이내로 입력해주세요'),
})
export type PatchNicknameBody = z.infer<typeof patchNicknameBodySchema>

// GET /users/profile/completion
export const getProfileCompletionResponseSchema = z.object({
  completionRate: z.number().nullish(),
  completed: z.boolean().nullish(),
  missingFields: z.array(z.string()).nullish(),
})
export type GetProfileCompletionResponse = z.infer<typeof getProfileCompletionResponseSchema>
