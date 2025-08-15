import {
  PostKakaoLoginBody,
  PostKakaoLoginBodySchema,
  PostKakaoRegisterBody,
  PostKakaoRegisterBodySchema,
  PostLoginBody,
  PostLoginBodySchema,
  PostRefreshTokenResponse,
  PostRefreshTokenResponseSchema,
  PostRegisterBody,
  PostRegisterBodySchema,
} from '@/types/apis/auth'
import { CareCode } from './interceptor'

// /auth/login
export const postLogin = async (body: PostLoginBody) => {
  const parsedBody = PostLoginBodySchema.parse(body)
  await CareCode.post('/auth/login', parsedBody)
}

// /auth/kakao/login
export const postKakaoLogin = async (body: PostKakaoLoginBody) => {
  const parsedBody = PostKakaoLoginBodySchema.parse(body)
  await CareCode.post('/auth/kakao/login', parsedBody)
}

// /auth/register
export const PostRegister = async (body: PostRegisterBody) => {
  const parsedBody = PostRegisterBodySchema.parse(body)
  await CareCode.post('/auth/register', parsedBody)
}

// /auth/kakao/register
export const PostKakaoRegister = async (body: PostKakaoRegisterBody) => {
  const parsedBody = PostKakaoRegisterBodySchema.parse(body)
  await CareCode.post('/auth/kakao/register', parsedBody)
}

// /auth/logout
export const PostLogout = async () => {
  await CareCode.post('/auth/logout')
}

// JWT 관리
let accessToken: string | null = null
let refreshTimer: NodeJS.Timeout | null = null

export function setAccessToken(token: string, expiresIn: number) {
  accessToken = token

  if (refreshTimer) clearTimeout(refreshTimer)

  // expiresIn(ms) 기준으로 30초 전 갱신
  const refreshTime = expiresIn - 30_000
  refreshTimer = setTimeout(async () => {
    try {
      await refreshAccessToken()
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
  if (refreshTimer) clearTimeout(refreshTimer)
}

// refresh API 호출 + 토큰 갱신
export async function refreshAccessToken(): Promise<PostRefreshTokenResponse> {
  const { data } = await CareCode.post('/auth/refresh')
  const parsed = PostRefreshTokenResponseSchema.parse(data)

  setAccessToken(parsed.accessToken, parsed.expiresIn)
  return parsed
}
