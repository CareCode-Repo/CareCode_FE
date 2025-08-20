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

export const postKakaoLoginBodySchema = z.object({
  kakaoAccessToken: z.string(),
})
export type PostKakaoLoginBody = z.infer<typeof postKakaoLoginBodySchema>

export const postKakaoLoginResponseSchema = kakaoLoginSuccessSchema
export type PostKakaoLoginResponse = z.infer<typeof postKakaoLoginResponseSchema>

// users
const signupBodySchema = z.object({
  name: z
    .string()
    .min(2, '닉네임은 2글자 이상이어야 합니다')
    .max(10, '닉네임은 10글자 이하여야 합니다'),
  role: z.enum(['ADMIN', 'CAREGIVER', 'GUEST', 'PARENT'], {
    required_error: '역할을 선택해주세요',
  }),
  // 현재 API 요구사항 (향후 제거 예정)
  // email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  // password: z.string().min(6, '비밀번호는 6글자 이상이어야 합니다'),
  // phoneNumber: z.string().optional(),
  // birthDate: z.string().optional(),
  // gender: z.enum(['MALE', 'FEMALE']).optional(),
  // address: z.string().optional(),
})

const signupResponseSchema = z.object({
  id: z.number(),
  userId: z.string(),
  email: z.string(),
  password: z.string().nullable(),
  name: z.string(),
  phoneNumber: z.string().nullable(),
  birthDate: z.string().nullable(),
  gender: z.string().nullable(),
  address: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  profileImageUrl: z.string().nullable(),
  role: z.string(),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

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

// /users
export const postSignupBodySchema = signupBodySchema
export type PostSignupBody = z.infer<typeof postSignupBodySchema>
export const postSignupResponseSchema = signupResponseSchema
export type PostSignupResponse = z.infer<typeof postSignupResponseSchema>

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

// GET /oauth2/kakao/auth-url
export const getKakaoAuthUrlResponseSchema = z.object({
  success: z.boolean(),
  redirectUri: z.string(),
  authUrl: z.string().url(),
  clientId: z.string(),
})
export type GetKakaoAuthUrlResponse = z.infer<typeof getKakaoAuthUrlResponseSchema>

// POST /api/auth/kakao/auth
export const postKakaoAuthBodySchema = z.object({
  code: z.string(),
})
export type PostKakaoAuthBody = z.infer<typeof postKakaoAuthBodySchema>
const kakaoAuthSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
  isNewUser: z.boolean(),
  user: z.object({
    userId: z.string(),
    email: z.string(),
    role: z.enum(['PARENT', 'CHILD']),
    name: z.string(),
  }),
})
const kakaoAuthFailSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errorCode: z.string().optional(),
})
export const postKakaoAuthResponseSchema = z.union([kakaoAuthSuccessSchema, kakaoAuthFailSchema])
export type PostKakaoAuthResponse = z.infer<typeof postKakaoAuthResponseSchema>
