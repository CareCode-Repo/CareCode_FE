'use client'

import Image from 'next/image'
import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 클릭')
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-[393px] h-screen mx-auto overflow-hidden">
      {/* 메인 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.svg"
          alt="배경"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      {/* 하단 흰색 배경 */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Image
          src="/images/bottom-wave.svg"
          alt="하단 배경"
          width={393}
          height={400}
          style={{ width: '100%' }}
          priority
        />
      </div>
      {/* 컨텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
      {/* 상단 이미지 */}
      <div className="mb-8 mt-44">
        <Image
          src="/images/img_signUp_2.png"
          alt="맘편한 로고"
          width={140}
          height={46}
          priority
        />
      </div>

      {/* 중앙 이미지 */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <div className="relative">
          <Image
            src="/images/img_signUp_1.png"
            alt="캐릭터"
            width={240}
            height={240}
            priority
          />
          {/* 캐릭터 그림자 */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <Image
              src="/images/character-shadow.svg"
              alt="그림자"
              width={240}
              height={34}
              priority
            />
          </div>
        </div>
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className="mb-16 w-full px-6">
        <button
          onClick={handleKakaoLogin}
          className="w-full flex justify-center"
        >
          <Image
            src="/images/kakao_login_medium_1.png"
            alt="카카오로 시작하기"
            width={300}
            height={45}
            priority
          />
        </button>
      </div>
      </div>
    </div>
  )
}