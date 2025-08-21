import { CareCode } from './interceptor'
import {
  PostLoginBody,
  PostLoginResponse,
  PostKakaoLoginBody,
  PostKakaoLoginResponse,
  PostRegisterBody,
  PostRegisterResponse,
  PostKakaoRegisterBody,
  PostSignupBody,
  PostSignupResponse,
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
  postSignupBodySchema,
  postSignupResponseSchema,
  getKakaoAuthUrlResponseSchema,
  GetKakaoAuthUrlResponse,
  postKakaoAuthBodySchema,
  PostKakaoAuthBody,
  postKakaoAuthResponseSchema,
  PostKakaoAuthResponse,
  kakaoRegistrationRequestSchema,
  KakaoRegistrationRequest,
  kakaoRegistrationResponseSchema,
  KakaoRegistrationResponse,
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

// POST /users - 새로운 회원가입 API (role과 nickname 중심)
export const postSignup = async (body: PostSignupBody): Promise<PostSignupResponse> => {
  const parsedBody = postSignupBodySchema.parse(body)

  // 기본값 설정
  const requestBody = {
    ...parsedBody,
    // phoneNumber: parsedBody.phoneNumber || '010-0000-0000',
    // birthDate: parsedBody.birthDate || '1990-01-01',
    // gender: parsedBody.gender || 'MALE',
  }

  const res = await CareCode.post('/users', requestBody)
  return postSignupResponseSchema.parse(res.data)
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
    window.location.href = '/'
    return
  }

  try {
    await refreshAccessToken({ refreshToken: token })
  } catch (err) {
    console.error('자동 토큰 갱신 실패', err)
    clearTokens()
    window.location.href = '/'
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
    const res = await CareCode.post('/auth/kakao/login', null, {
      params: { code: parsedBody.code },
    })

    // 성공 응답 처리 (200 또는 204 모두 허용)
    if (res.status === 200 || res.status === 204) {
      return postKakaoAuthResponseSchema.parse(res.data)
    } else {
      throw new Error('Unexpected response status: ' + res.status)
    }
  } catch (error) {
    throw error
  }
}

// POST /users/auth/users/kakao/complete-registration
export const postKakaoCompleteRegistration = async (
  body: KakaoRegistrationRequest,
): Promise<KakaoRegistrationResponse> => {
  const parsedBody = kakaoRegistrationRequestSchema.parse(body)
  const res = await CareCode.post('/auth/kakao/complete-registration', parsedBody)
  return kakaoRegistrationResponseSchema.parse(res.data)
}
