'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ReactElement, useEffect, useRef, Suspense } from 'react'
import { setTokens } from '@/apis/auth'
import Loading from '@/components/common/loading'
import { usePostKakaoAuth } from '@/queries/auth'

const KakaoCallbackContent = (): ReactElement | null => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { mutate: postKakaoAuth, isPending } = usePostKakaoAuth()
  const processedRef = useRef<string | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      console.error('No authorization code found')
      router.push('/')
      return
    }

    // 이미 처리된 코드인지 확인하여 중복 API 호출 방지
    if (processedRef.current === code) {
      return
    }

    // 코드 처리 시작 표시
    processedRef.current = code

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

            // URL에서 code 파라미터 제거
            window.history.replaceState({}, '', window.location.pathname)

            // 신규 사용자면 회원가입 페이지로, 기존 사용자면 홈으로
            if (data.isNewUser) {
              router.push('/signup')
            } else {
              router.push('/home')
            }
          } else {
            console.error('Authentication failed:', data.message)
            processedRef.current = null // 실패 시 재시도 가능하도록 초기화
            router.push('/')
          }
        },
        onError: (error) => {
          console.error('Kakao authentication error:', error)

          // authorization code 관련 에러인 경우 재시도하지 않음
          // const isAuthCodeError = (error as any)?.response?.data?.message?.includes('authorization code')
          // if (!isAuthCodeError) {
          //   processedRef.current = null // 다른 에러의 경우 재시도 가능하도록 초기화
          // }

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
