import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, refreshAccessToken, clearAccessToken, getRefreshToken } from './auth'
import { printErrorConsole, printRequestConsole, printResponseConsole } from '@/utils/console'

const isDevelopment = process.env.NODE_ENV === 'development' // 개발 단계인지 확인

export const CareCode: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30_000,
  headers: { Accept: '*/*' },
  withCredentials: true, // refreshToken은 HttpOnly 쿠키
})

// 요청 시 Authorization 헤더 적용
// eslint-disable-next-line @typescript-eslint/no-explicit-any
CareCode.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  if (isDevelopment) printRequestConsole(config)
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 401 발생 시 refresh + 재시도
CareCode.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (res: AxiosResponse<any, any>) => {
    printResponseConsole(res)
    return res
  },
  async (error) => {
    if (isDevelopment) printErrorConsole(error)
    if (error.response?.status === 401) {
      try {
        const refreshToken = getRefreshToken()
        if (refreshToken !== null) {
          const newToken = await refreshAccessToken({ refreshToken })
          error.config.headers.Authorization = `Bearer ${newToken.accessToken}`
          return CareCode(error.config)
        } else {
          throw new Error('Refresh Token is NULL')
        }
      } catch {
        clearAccessToken()
        window.location.href = '/login' // 로그인 화면으로 이동
      }
    }
    return Promise.reject(error)
  },
)
