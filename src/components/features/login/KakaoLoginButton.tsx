'use client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { JSX, useEffect } from 'react'
import { ZodError } from 'zod'
import { postKakaoLogin, setTokens } from '@/apis/auth'

const KakaoLoginButton = (): JSX.Element => {
  const router = useRouter()

  const handleLogin = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code`
    window.location.href = kakaoURL
  }

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')?.trim()
    if (!code) return

    const login = async () => {
      try {
        const data = await postKakaoLogin({ kakaoAccessToken: code })
        setTokens(data.accessToken, data.refreshToken, data.userId, data.expiresIn)
        router.push('/home')
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.log('유저 없음, 회원가입 진행')
            router.push('/register')
          } else {
            console.error('Axios 요청 실패', error.response?.status)
          }
        } else if (error instanceof ZodError) {
          console.error('응답 검증 실패', error)
        } else if (error instanceof Error) {
          console.error('기타 오류', error)
        } else {
          console.error('알 수 없는 오류', error)
        }
      }
    }

    login()
  }, [router])

  return <button onClick={handleLogin}>카카오 로그인</button>
}

export default KakaoLoginButton
