'use client'
import { JSX } from 'react'
import Button from '@/components/common/Button'
import Error from '@/components/common/Error'
import Loading from '@/components/common/loading'
// import KakaoLoginButton from '@/components/features/login/KakaoLoginButton'
import { useGetKakaoAuthUrl } from '@/queries/auth'

export default function Home(): JSX.Element {
  const { data, isLoading, error } = useGetKakaoAuthUrl()

  const handleKakaoLogin = () => {
    if (data) {
      window.location.href = data.authUrl
    } else {
      console.error('카카오 인증 URL을 가져오지 못했습니다.')
    }
  }

  if (isLoading) return <Loading />
  if (error) return <Error content="잠시 후 다시 시도해주세요." />

  return (
    <div>
      <h1>Main</h1>
      <Button color="green" onClick={handleKakaoLogin}>
        카카오 로그인
      </Button>
      {/* <KakaoLoginButton /> */}
    </div>
  )
}
