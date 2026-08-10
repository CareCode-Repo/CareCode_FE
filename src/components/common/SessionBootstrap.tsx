'use client'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { clearTokens, getAccessToken, hasStoredSession } from '@/apis/auth'
import { runRefresh } from '@/apis/interceptor'

/**
 * 앱 부팅 시 세션 복구.
 *
 * 액세스 토큰은 메모리에만 두므로 새로고침하면 사라진다. 대신 HttpOnly 리프레시 쿠키가
 * 남아 있으므로, 로그인 이력이 있으면 갱신을 한 번 시도해 로그인 상태를 이어붙인다.
 * 복구가 끝나기 전에 하위 화면이 요청을 보내면 불필요한 401 이 나므로 그 동안은 렌더를 미룬다.
 */
const SessionBootstrap = ({ children }: { children: ReactNode }): ReactElement => {
  const [isRestoring, setIsRestoring] = useState(() => hasStoredSession() && !getAccessToken())

  useEffect(() => {
    if (!isRestoring) return

    let cancelled = false

    runRefresh()
      .catch(() => clearTokens())
      .finally(() => {
        if (!cancelled) setIsRestoring(false)
      })

    return () => {
      cancelled = true
    }
    // 최초 1회만 시도한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isRestoring) {
    return <div className="h-dvh bg-gray-50" aria-busy="true" aria-label="세션 확인 중" />
  }

  return <>{children}</>
}

export default SessionBootstrap
