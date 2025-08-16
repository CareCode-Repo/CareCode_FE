import { z as zod } from 'zod'

// login 공통
const LoginSuccessSchema = zod.object({
  success: zod.literal(true),
  message: zod.string(),
  accessToken: zod.string(),
  refreshToken: zod.string(),
  tokenType: zod.string(),
  expiresIn: zod.number(),
  userId: zod.string(),
  email: zod.string().email(),
  role: zod.enum(['PARENT', 'CHILD']),
})
const LoginFailSchema = zod.object({
  success: zod.literal(false),
  message: zod.string(),
  errorCode: zod.string(),
})

// /auth/login
export const PostLoginBodySchema = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(1),
})
export type PostLoginBody = zod.infer<typeof PostLoginBodySchema>
export const PostLoginResponseSchema = zod.union([LoginSuccessSchema, LoginFailSchema])
export type PostLoginResponse = zod.infer<typeof PostLoginResponseSchema>

export const KakaoProfileSchema = zod.object({
  kakaoId: zod.string(),
  nickname: zod.string(),
  profileImageUrl: zod.string().url(),
})

// /auth/kakao/login
const KakaoLoginSuccessSchema = LoginSuccessSchema
const KakaoLoginFailSchema = LoginFailSchema.extend({
  kakaoProfile: KakaoProfileSchema,
})

export const PostKakaoLoginBodySchema = zod.object({
  kakaoAccessToken: zod.string(),
})
export type PostKakaoLoginBody = zod.infer<typeof PostKakaoLoginBodySchema>

export const PostKakaoLoginResponseSchema = zod.union([
  KakaoLoginSuccessSchema,
  KakaoLoginFailSchema,
])
export type PostKakaoLoginResponse = zod.infer<typeof PostKakaoLoginResponseSchema>

// register 공통
const registerBodySchema = zod.object({
  kakaoAccessToken: zod.string(),
  email: zod.string().email(),
  phoneNumber: zod.string(),
  birthDate: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD여야 합니다'),
  gender: zod.enum(['MALE', 'FEMALE']),
  address: zod.string().optional(),
})
const registerResponseSchema = zod.object({
  success: zod.boolean(),
  message: string(),
  userId: string(),
})

// /auth/kakao/register
export const PostKakaoRegisterBodySchema = registerBodySchema
export type PostKakaoRegisterBody = zod.infer<typeof PostKakaoRegisterBody>
export const PostKakaoRegisterResponseSchema = registerResponseSchema
export type PostKakaoRegisterResponse = zod.infer<typeof PostKakaoRegisterResponseSchema>

// /auth/register
export const PostRegisterBodySchema = registerBodySchema
export type PostRegisterBody = zod.infer<typeof PostRegisterBodySchema>
export const PostRegisterResponseSchema = registerResponseSchema
export type PostRegisterResponse = zod.infer<typeof PostRegisterResponseSchema>

// /auth/refresh
export const PostRefreshTokenBodySchema = zod.object({
  refreshToken: zod.string(),
})
export type PostRefreshTokenBody = zod.infer<typeof PostRefreshTokenBodySchema>
export const PostRefreshTokenResponseSchema = zod.object({
  success: zod.boolean(),
  accessToken: zod.string(),
  refreshToken: zod.string(),
  tokenType: zod.string(),
  expiresIn: zod.number(),
  userId: zod.string(),
})
export type PostRefreshTokenResponse = zod.infer<typeof PostRefreshTokenResponseSchema>

// /auth/logout
export const PostLogoutResponseSchema = zod.object({
  message: zod.string(),
})
export type PostLogoutResponse = zod.infer<typeof PostLogoutResponseSchema>
