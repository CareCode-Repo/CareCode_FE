import { z } from 'zod'

// login 공통
const loginSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
  userId: z.string(),
  email: z.string().email(),
  role: z.enum(['PARENT', 'CHILD']),
})
const loginFailSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errorCode: z.string(),
})

// /auth/login
export const postLoginBodySchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
})
export type PostLoginBody = z.infer<typeof postLoginBodySchema>
export const postLoginResponseSchema = z.union([loginSuccessSchema, loginFailSchema])
export type PostLoginResponse = z.infer<typeof postLoginResponseSchema>

export const kakaoProfileSchema = z.object({
  kakaoId: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().url(),
})

// /auth/kakao/login
const kakaoLoginSuccessSchema = loginSuccessSchema
const kakaoLoginFailSchema = loginFailSchema.extend({
  kakaoProfile: kakaoProfileSchema,
})

export const postKakaoLoginBodySchema = z.object({
  kakaoAccessToken: z.string(),
})
export type PostKakaoLoginBody = z.infer<typeof postKakaoLoginBodySchema>

export const postKakaoLoginResponseSchema = z.union([kakaoLoginSuccessSchema, kakaoLoginFailSchema])
export type PostKakaoLoginResponse = z.infer<typeof postKakaoLoginResponseSchema>

// register 공통
const registerBodySchema = z.object({
  kakaoAccessToken: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD여야 합니다'),
  gender: z.enum(['MALE', 'FEMALE']),
  address: z.string().optional(),
})
const registerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  userId: z.string(),
})

// /auth/kakao/register
export const postKakaoRegisterBodySchema = registerBodySchema
export type PostKakaoRegisterBody = z.infer<typeof postKakaoRegisterBodySchema>
export const postKakaoRegisterResponseSchema = registerResponseSchema
export type PostKakaoRegisterResponse = z.infer<typeof postKakaoRegisterResponseSchema>

// /auth/register
export const postRegisterBodySchema = registerBodySchema
export type PostRegisterBody = z.infer<typeof postRegisterBodySchema>
export const postRegisterResponseSchema = registerResponseSchema
export type PostRegisterResponse = z.infer<typeof postRegisterResponseSchema>

// /auth/refresh
export const postRefreshTokenBodySchema = z.object({
  refreshToken: z.string(),
})
export type PostRefreshTokenBody = z.infer<typeof postRefreshTokenBodySchema>
export const postRefreshTokenResponseSchema = z.object({
  success: z.boolean(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
  userId: z.string(),
})
export type PostRefreshTokenResponse = z.infer<typeof postRefreshTokenResponseSchema>

// /auth/logout
export const postLogoutResponseSchema = z.object({
  message: z.string(),
})
export type PostLogoutResponse = z.infer<typeof postLogoutResponseSchema>
