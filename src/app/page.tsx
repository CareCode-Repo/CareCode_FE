'use client'
import { JSX } from 'react'
import KakaoLoginButton from '@/components/features/login/KakaoLoginButton'

export default function Home(): JSX.Element {
  return (
    <div>
      <h1>Main</h1>
      <KakaoLoginButton />
    </div>
  )
}
