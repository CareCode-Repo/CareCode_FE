import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { ReactNode } from 'react'

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
      <body className={`font-pretendard antialiased w-full min-h-dvh`}>{children}</body>
    </html>
  )
}
