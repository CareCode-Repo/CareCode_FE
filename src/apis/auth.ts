import {
  PostKakaoLoginBody,
  PostKakaoLoginBodySchema,
  PostKakaoLoginResponseSchema,
  PostKakaoRegisterBody,
  PostKakaoRegisterBodySchema,
  PostKakaoRegisterResponseSchema,
  PostLoginBody,
  PostLoginBodySchema,
  PostLoginResponseSchema,
  PostRefreshTokenBody,
  PostRefreshTokenBodySchema,
  PostRefreshTokenResponse,
  PostRefreshTokenResponseSchema,
  PostRegisterBody,
  PostRegisterBodySchema,
  PostRegisterResponseSchema,
} from '@/types/apis/auth'
import { CareCode } from './interceptor'

// /auth/login
export const postLogin = async (body: PostLoginBody) => {
  const parsedBody = PostLoginBodySchema.parse(body)
  const res = await CareCode.post('/auth/login', parsedBody)
  return PostLoginResponseSchema.parse(res.data)
}

// /auth/kakao/login
export const postKakaoLogin = async (body: PostKakaoLoginBody) => {
  const parsedBody = PostKakaoLoginBodySchema.parse(body)
  const res = await CareCode.post('/auth/kakao/login', parsedBody)
  return PostKakaoLoginResponseSchema.parse(res.data)
}

// /auth/register
export const PostRegister = async (body: PostRegisterBody) => {
  const parsedBody = PostRegisterBodySchema.parse(body)
  const res = await CareCode.post('/auth/register', parsedBody)
  return PostRegisterResponseSchema.parse(res.data)
}

// /auth/kakao/register
export const PostKakaoRegister = async (body: PostKakaoRegisterBody) => {
  const parsedBody = PostKakaoRegisterBodySchema.parse(body)
  const res = await CareCode.post('/auth/kakao/register', parsedBody)
  return PostKakaoRegisterResponseSchema.parse(res.data)
}

// /auth/logout
export const PostLogout = async () => {
  const res = await CareCode.post('/auth/logout')
  return PostLoginResponseSchema.parse(res.data)
}

// JWT 관리
let accessToken: string | null = null
let refreshToken: string | null = null
let refreshTimer: NodeJS.Timeout | null = null

export function setAccessToken(newAccessToken: string, newRefreshToken: string, expiresIn: number) {
  accessToken = newAccessToken
  refreshToken = newRefreshToken

  if (refreshTimer) clearTimeout(refreshTimer)

  // expiresIn(ms) 기준으로 30초 전 갱신
  const refreshTime = expiresIn - 30_000
  refreshTimer = setTimeout(async () => {
    try {
      if (refreshToken !== null) {
        await refreshAccessToken({ refreshToken })
      } else {
        throw new Error('Refresh Token is NULL')
      }
    } catch (err) {
      console.error('자동 토큰 갱신 실패', err)
      clearAccessToken()
      window.location.href = '/login'
    }
  }, refreshTime)
}

export function getAccessToken() {
  return accessToken
}

export function clearAccessToken() {
  accessToken = null
  refreshToken = null
  if (refreshTimer) clearTimeout(refreshTimer)
}

// refresh API 호출 + 토큰 갱신
export async function refreshAccessToken(
  body: PostRefreshTokenBody,
): Promise<PostRefreshTokenResponse> {
  const parsedBody = PostRefreshTokenBodySchema.parse(body)
  const res = await CareCode.post('/auth/refresh', parsedBody)
  const parsed = PostRefreshTokenResponseSchema.parse(res.data)

  setAccessToken(parsed.accessToken, parsed.refreshToken, parsed.expiresIn)
  return parsed
}
