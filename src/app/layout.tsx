import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '맘편한',
  description: '맘편한은 부모와 자녀를 위한 육아 정보 공유 플랫폼입니다.',
  viewport:
    'minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover user-scalable=no',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
