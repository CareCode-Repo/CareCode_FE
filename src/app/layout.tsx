import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '맘편한',
  description: '맘편한은 부모와 자녀를 위한 육아 정보 공유 플랫폼입니다.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'contain',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-pretendard antialiased w-full max-w-sm mx-auto border-2 min-h-dvh`}>
        {children}
      </body>
    </html>
  )
}
