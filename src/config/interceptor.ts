import { printErrorConsole, printRequestConsole, printResponseConsole } from '@/utils/console'
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const isDevelopment = process.env.NODE_ENV === 'development' // 개발 단계인지 확인: 로그 출력 판단

const setInterceptor = (url?: string): AxiosInstance => {
  const baseUrl = url ?? process.env.API_URL
  if (!baseUrl) throw new Error('API URL is not defined')

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: { Accept: '*/*' },
  })

  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
      if (isDevelopment) printRequestConsole(config)

      if (config.url !== '/auth/kakao') {
        const user = { uid: '111' } // temp

        config.headers.Authorization = `Bearer ${user.uid}`

        if (config.data instanceof FormData) {
          // multipart/form-data는 boundary 때문에 직접 지정하지 않는 게 좋음
          delete config.headers['Content-Type']
        } else {
          config.headers['Content-Type'] = 'application/json'
        }
      }
      return config
    },
    (error) => {
      if (isDevelopment) printErrorConsole(error)
      return Promise.reject(error)
    },
  )

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
      if (isDevelopment) printResponseConsole(response)
      return response
    },
    (error) => {
      if (isDevelopment) printErrorConsole(error)
      return Promise.reject(error)
    },
  )
  return axiosInstance
}

export const CareCode = setInterceptor()
