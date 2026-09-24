/**
 * 프런트가 부르는 경로가 서버에 실제로 있는지 확인한다.
 *
 * 서버에서 지운 경로(`/oauth2/kakao/auth-url`)를 프런트가 계속 불러 메인 화면의 카카오 로그인이
 * 아무 반응 없던 일이 있었다. 타입 검사도 린트도 이런 불일치를 잡지 못한다 — 경로는 문자열이기 때문이다.
 *
 * 그래서 서버가 고정해 둔 OpenAPI 스펙(`openapi/openapi.json`, 서버 저장소 `docs/api/openapi.json`)과
 * `src/apis/*.ts` 의 호출을 대조한다. 스펙 갱신: `npm run sync:openapi`
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const API_DIR = join(process.cwd(), 'src/apis')
const SPEC_PATH = join(process.cwd(), 'openapi/openapi.json')

type Spec = { paths: Record<string, Record<string, unknown>> }
type Call = { method: string; path: string; file: string; raw: string }

const spec: Spec = JSON.parse(readFileSync(SPEC_PATH, 'utf-8'))

const PLACEHOLDER = '{}'

/**
 * 경로를 세그먼트로 나눈다. 값이 들어가는 자리는 `{}` 로 둔다.
 *
 * 프런트의 `${type}` 은 경로 변수일 수도 있고(`${facilityId}`), 리터럴 값의 유니온일 수도 있다
 * (`${'privacy-policy' | 'terms'}`). 어느 쪽인지 문자열만 보고는 알 수 없으므로 한 세그먼트 와일드카드로 본다.
 */
const toSegments = (path: string): string[] =>
  path
    .split('?')[0]
    .replace(/\$\{[^}]*\}/g, PLACEHOLDER)
    .replace(/\{[^}/]*\}/g, PLACEHOLDER)
    .replace(/\/+$/, '')
    .split('/')

const segmentsMatch = (front: string[], server: string[]): boolean =>
  front.length === server.length &&
  front.every(
    (segment, index) =>
      segment === server[index] || segment === PLACEHOLDER || server[index] === PLACEHOLDER,
  )

const serverRoutes: { method: string; segments: string[]; path: string }[] = []
for (const [path, methods] of Object.entries(spec.paths)) {
  for (const method of Object.keys(methods)) {
    serverRoutes.push({ method: method.toUpperCase(), segments: toSegments(path), path })
  }
}

/** `CareCode.get('/facilities')`, `CareCode.post(\`/facilities/${id}/bookings\`, body)` 를 뽑는다. */
const collectCalls = (): Call[] => {
  const calls: Call[] = []
  for (const file of readdirSync(API_DIR).filter((name) => name.endsWith('.ts'))) {
    const source = readFileSync(join(API_DIR, file), 'utf-8')
    const pattern = /CareCode\.(get|post|put|patch|delete)\s*(?:<[^>]*>)?\(\s*([`'"])([^`'"]+)\2/g
    let match: RegExpExecArray | null
    while ((match = pattern.exec(source)) !== null) {
      calls.push({
        method: match[1].toUpperCase(),
        path: match[3],
        file,
        raw: `${match[1].toUpperCase()} ${match[3]}`,
      })
    }
  }
  return calls
}

describe('OpenAPI 계약 대조', () => {
  it('스펙이 비어 있지 않다 — 빈 파일을 두고 통과하는 사고 방지', () => {
    expect(Object.keys(spec.paths).length).toBeGreaterThan(100)
    expect(
      serverRoutes.some((route) => route.method === 'POST' && route.path === '/auth/login'),
    ).toBe(true)
  })

  it('src/apis 에서 호출을 찾아낸다', () => {
    expect(collectCalls().length).toBeGreaterThan(100)
  })

  it('프런트가 부르는 모든 경로가 서버 스펙에 있다', () => {
    const missing = collectCalls()
      .filter((call) => {
        const segments = toSegments(call.path)
        return !serverRoutes.some(
          (route) => route.method === call.method && segmentsMatch(segments, route.segments),
        )
      })
      .map((call) => {
        // 같은 경로에 다른 메서드만 있는 경우를 알려 주면 원인을 바로 안다.
        const segments = toSegments(call.path)
        const others = serverRoutes
          .filter((route) => segmentsMatch(segments, route.segments))
          .map((route) => route.method)
        return `${call.raw}  (${call.file})${others.length ? ` — 서버에는 ${[...new Set(others)].join(',')} 만 있음` : ''}`
      })

    expect(
      missing,
      [
        '서버 스펙에 없는 경로를 부르고 있습니다.',
        '서버가 경로를 바꿨다면 프런트를 고치고, 스펙이 낡았다면 `npm run sync:openapi` 로 갱신하세요.',
        '',
        ...missing,
      ].join('\n'),
    ).toEqual([])
  })

  it('지워진 옛 경로를 다시 부르면 잡아낸다 — 이 검사가 실제로 동작하는지 확인', () => {
    // 카카오 로그인이 조용히 깨졌던 그 경로. 스펙에 없어야 하고, 대조에서 걸려야 한다.
    const removed = toSegments('/oauth2/kakao/auth-url')
    expect(
      serverRoutes.some(
        (route) => route.method === 'GET' && segmentsMatch(removed, route.segments),
      ),
    ).toBe(false)
  })
})
