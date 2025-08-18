'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ReactElement, useEffect, Suspense } from 'react'
import { setTokens } from '@/apis/auth'
import Loading from '@/components/common/loading'
import { usePostKakaoAuth } from '@/queries/auth'

const KakaoCallbackContent = (): ReactElement | null => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { mutate: postKakaoAuth, isPending } = usePostKakaoAuth()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      console.error('No authorization code found')
      router.push('/')
      return
    }

    postKakaoAuth(
      { code },
      {
        onSuccess: (data) => {
          if (data.success) {
            // 토큰 저장 (refreshToken은 백엔드에서 추후 추가 예정 -> 현재 안오고 있음.)
            // 임시로 빈 문자열과 기본값 사용
            setTokens(
              data.accessToken,
              '', // refreshToken - 백엔드에서 추가될 예정
              data.user.userId,
              data.expiresIn,
            )

            // 신규 사용자면 회원가입 페이지로, 기존 사용자면 홈으로
            if (data.isNewUser) {
              router.push('/signup')
            } else {
              router.push('/home')
            }
          } else {
            console.error('Authentication failed:', data.message)
            router.push('/')
          }
        },
        onError: (error) => {
          console.error('Kakao authentication error:', error)
          router.push('/')
        },
      },
    )
  }, [searchParams, postKakaoAuth, router])

  if (isPending) {
    return <Loading content="카카오 로그인 중..." />
  }

  return null
}

const KakaoCallbackPage = (): ReactElement => {
  return (
    <Suspense fallback={<Loading content="카카오 로그인 중..." />}>
      <KakaoCallbackContent />
    </Suspense>
  )
}

export default KakaoCallbackPage
