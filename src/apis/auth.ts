import { CareCode } from './interceptor'
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
  getKakaoAuthUrlResponseSchema,
  GetKakaoAuthUrlResponse,
  postKakaoAuthBodySchema,
  PostKakaoAuthBody,
  postKakaoAuthResponseSchema,
  PostKakaoAuthResponse,
} from '@/types/apis/auth'

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

let refreshTimer: NodeJS.Timeout | null = null

// 토큰 관리
export function setTokens(
  accessToken: string,
  refreshToken: string,
  userId: string,
  expiresIn: number,
): void {
  if (typeof window === 'undefined') return

  // sessionStorage: accessToken + userId
  sessionStorage.setItem('accessToken', accessToken)
  sessionStorage.setItem('userId', userId)

  // localStorage: refreshToken
  localStorage.setItem('refreshToken', refreshToken)

  // 이전 타이머 제거
  if (refreshTimer) clearTimeout(refreshTimer)

  // 자동 갱신: expiresIn(ms) 기준 30초 전
  const refreshTime = expiresIn - 30_000
  refreshTimer = setTimeout(() => autoRefreshToken(), refreshTime)
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('accessToken')
}
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken')
}
export function getUserId(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('userId')
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('userId')
  localStorage.removeItem('refreshToken')

  if (refreshTimer) clearTimeout(refreshTimer)
}

async function autoRefreshToken() {
  const token = getRefreshToken()
  if (!token) {
    clearTokens()
    window.location.href = '/login'
    return
  }

  try {
    await refreshAccessToken({ refreshToken: token })
  } catch (err) {
    console.error('자동 토큰 갱신 실패', err)
    clearTokens()
    window.location.href = '/login'
  }
}

export async function refreshAccessToken(
  body: PostRefreshTokenBody,
): Promise<PostRefreshTokenResponse> {
  const parsedBody = postRefreshTokenBodySchema.parse(body)
  const res = await CareCode.post('/auth/refresh', parsedBody)
  const parsed = postRefreshTokenResponseSchema.parse(res.data)

  // sessionStorage/localStorage에 반영
  setTokens(parsed.accessToken, parsed.refreshToken, parsed.userId, parsed.expiresIn)
  return parsed
}

// GET /oauth2/kakao/auth-url - 카카오 인증 URL 요청
export const getKakaoAuthUrl = async (redirectUri?: string): Promise<GetKakaoAuthUrlResponse> => {
  const params = redirectUri ? { redirectUri } : {}
  const res = await CareCode.get('/oauth2/kakao/auth-url', { params })
  return getKakaoAuthUrlResponseSchema.parse(res.data)
}

// /api/auth/kakao/auth
export const postKakaoAuth = async (body: PostKakaoAuthBody): Promise<PostKakaoAuthResponse> => {
  const parsedBody = postKakaoAuthBodySchema.parse(body)
  try {
    const res = await CareCode.post('/api/auth/kakao/auth', null, {
      params: { code: parsedBody.code },
    })

    // 성공 응답 처리 (200 또는 204 모두 허용)
    if (res.status === 200 || res.status === 204) {
      return postKakaoAuthResponseSchema.parse(res.data)
    } else {
      throw new Error('Unexpected response status: ' + res.status)
    }
  } catch (error: any) {
    // Kakao OAuth 관련 에러에 대한 향상된 처리
    if (error?.response?.status === 400) {
      const errorData = error.response.data

      // Kakao OAuth 특정 에러 처리
      if (errorData?.message?.includes('authorization code')) {
        const enhancedError = new Error(
          '카카오 인증 코드가 만료되었거나 이미 사용되었습니다. 다시 로그인해주세요.',
        ) as any
        enhancedError.name = 'KakaoAuthCodeError'
        enhancedError.originalError = error
        throw enhancedError
      }

      // 기타 400 에러
      throw new Error(errorData?.message || '카카오 로그인 중 오류가 발생했습니다.')
    }

    throw error
  }
}
