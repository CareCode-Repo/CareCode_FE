import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { ReactNode } from 'react'
import PromotionPanel from '@/components/organism/PromotionPanel'

export const metadata: Metadata = {
  title: '맘편한',
  description: '맘편한은 부모와 자녀를 위한 육아 정보 공유 플랫폼입니다.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): ReactNode {
  return (
    <html lang="ko">
      <body className={`font-pretendard antialiased min-h-dvh`}>
        <div className="flex min-h-dvh">
          {/* 데스크톱 프로모션 패널 */}
          <div className="hidden sm:block sm:flex-1/3">
            <PromotionPanel />
          </div>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 sm:flex-2/3 bg-green-50">
            <div className="h-dvh max-w-sm mx-auto overflow-y-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
