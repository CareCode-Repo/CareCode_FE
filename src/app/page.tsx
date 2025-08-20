'use client'
import { JSX } from 'react'
// import KakaoLoginButton from '@/components/features/login/KakaoLoginButton'
import Elipse from '@/assets/icons/characters/Ellipse.svg'
import GroundIcon from '@/assets/icons/characters/ground.svg'
import CharcacterIcon from '@/assets/icons/characters/login.svg'
import KakaoIcon from '@/assets/icons/logo/kakao.svg'
import LogoIcon from '@/assets/icons/logo/logo.svg'
import Error from '@/components/common/Error'
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
    <div className="relative flex h-full flex-col items-center justify-center bg-green-200">
      <div className="flex flex-col items-center gap-19">
        <LogoIcon />
        <div className="relative flex items-center justify-center">
          <CharcacterIcon className="z-20 ml-7.5 size-60" />
          <Elipse className="absolute bottom-0 left-1/2 z-10 w-45 -translate-x-1/2 transform" />
        </div>
        <GroundIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 transform" />
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className="absolute bottom-12 w-full px-6">
        <button
          onClick={handleKakaoLogin}
          disabled={isPending}
          className="text-t1-semibold bg-yellow relative flex w-full items-center justify-center rounded-lg py-3"
        >
          <KakaoIcon className="absolute left-6 size-5" />
          <span>{isPending ? '연결 중...' : '카카오로 로그인하기'}</span>
        </button>
      </div>
      {error && <Error content="잠시 후 다시 시도해주세요." />}
    </div>
  )
}
