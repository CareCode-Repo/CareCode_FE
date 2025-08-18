'use client'
import { JSX } from 'react'
import Button from '@/components/common/Button'
import Error from '@/components/common/Error'
import KakaoLoginButton from '@/components/features/login/KakaoLoginButton'
import { useGetKakaoAuthUrlMutation } from '@/queries/auth'

export default function Home(): JSX.Element {
  const { mutate: getKakaoAuthUrl, isPending, error } = useGetKakaoAuthUrlMutation()

  const handleKakaoLogin = () => {
    getKakaoAuthUrl(undefined, {
      onSuccess: (data) => {
        window.location.href = data.authUrl
      },
      onError: (err) => {
        console.error('카카오 인증 URL을 가져오지 못했습니다:', err)
      },
    })
  }

  return (
    <div>
      <h1>Main</h1>
      <Button color="green" onClick={handleKakaoLogin} disabled={isPending}>
        {isPending ? '로그인 중...' : '카카오로 로그인하기'}
      </Button>
      {error && <Error content="잠시 후 다시 시도해주세요." />}
      <KakaoLoginButton />
    </div>
  )
}
