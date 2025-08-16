import {
  PostLoginBody,
  PostLoginResponse,
  PostKakaoLoginBody,
  PostKakaoLoginResponse,
  PostRegisterBody,
  PostRegisterResponse,
  PostKakaoRegisterBody,
  PostRefreshTokenBody,
  PostRefreshTokenResponse,
  postKakaoLoginBodySchema,
  postKakaoLoginResponseSchema,
  postKakaoRegisterBodySchema,
  postKakaoRegisterResponseSchema,
  postLoginBodySchema,
  postLoginResponseSchema,
  postRefreshTokenBodySchema,
  postRefreshTokenResponseSchema,
  postRegisterBodySchema,
  postRegisterResponseSchema,
} from '@/types/apis/auth'
import { CareCode } from './interceptor'

// /auth/login
export const postLogin = async (body: PostLoginBody): Promise<PostLoginResponse> => {
  const parsedBody = postLoginBodySchema.parse(body)
  const res = await CareCode.post('/auth/login', parsedBody)
  return postLoginResponseSchema.parse(res.data)
}

// /auth/kakao/login
export const postKakaoLogin = async (body: PostKakaoLoginBody): Promise<PostKakaoLoginResponse> => {
  const parsedBody = postKakaoLoginBodySchema.parse(body)
  const res = await CareCode.post('/auth/kakao/login', parsedBody)
  return postKakaoLoginResponseSchema.parse(res.data)
}

// /auth/register
export const PostRegister = async (body: PostRegisterBody): Promise<PostRegisterResponse> => {
  const parsedBody = postRegisterBodySchema.parse(body)
  const res = await CareCode.post('/auth/register', parsedBody)
  return postRegisterResponseSchema.parse(res.data)
}

// /auth/kakao/register
export const PostKakaoRegister = async (
  body: PostKakaoRegisterBody,
): Promise<PostRegisterResponse> => {
  const parsedBody = postKakaoRegisterBodySchema.parse(body)
  const res = await CareCode.post('/auth/kakao/register', parsedBody)
  return postKakaoRegisterResponseSchema.parse(res.data)
}

// JWT 관리
let accessToken: string | null = null
let refreshToken: string | null = null
let refreshTimer: NodeJS.Timeout | null = null

export function setAccessToken(
  newAccessToken: string,
  newRefreshToken: string,
  expiresIn: number,
): void {
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

export function getAccessToken(): string | null {
  return accessToken
}
export function getRefreshToken(): string | null {
  return refreshToken
}

export function clearAccessToken(): void {
  accessToken = null
  refreshToken = null
  if (refreshTimer) clearTimeout(refreshTimer)
}

// refresh API 호출 + 토큰 갱신
export async function refreshAccessToken(
  body: PostRefreshTokenBody,
): Promise<PostRefreshTokenResponse> {
  const parsedBody = postRefreshTokenBodySchema.parse(body)
  const res = await CareCode.post('/auth/refresh', parsedBody)
  const parsed = postRefreshTokenResponseSchema.parse(res.data)

  setAccessToken(parsed.accessToken, parsed.refreshToken, parsed.expiresIn)
  return parsed
}
