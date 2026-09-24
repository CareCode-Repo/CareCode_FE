/**
 * 서버가 고정해 둔 OpenAPI 스펙을 가져온다.
 *
 * 서버 저장소(CareCode_Interface)의 `docs/api/openapi.json` 이 원본이고, 여기서는 사본을 둔다.
 * 사본을 두는 이유: 계약 대조 테스트가 네트워크 없이도 돌아야 하고, CI 결과가 서버 저장소의
 * 상태에 따라 흔들리면 안 된다. 사본이 낡는 문제는 매일 도는 `openapi-drift` 워크플로가 잡는다.
 *
 *   npm run sync:openapi                      # main 에서 가져온다
 *   OPENAPI_SRC=../CareCode_Interface/docs/api/openapi.json npm run sync:openapi   # 로컬 체크아웃에서
 *   OPENAPI_REF=feat/some-branch npm run sync:openapi                              # 다른 브랜치에서
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const TARGET = resolve('openapi/openapi.json')
const ref = process.env.OPENAPI_REF ?? 'main'
const remote = `https://raw.githubusercontent.com/CareCode-Repo/CareCode_Interface/${ref}/docs/api/openapi.json`

mkdirSync(dirname(TARGET), { recursive: true })

if (process.env.OPENAPI_SRC) {
  const source = resolve(process.env.OPENAPI_SRC)
  copyFileSync(source, TARGET)
  console.log(`로컬 파일에서 스펙을 복사했습니다: ${source}`)
} else {
  const response = await fetch(remote)
  if (!response.ok) {
    console.error(`스펙을 가져오지 못했습니다 (${response.status}): ${remote}`)
    process.exit(1)
  }
  writeFileSync(TARGET, await response.text(), 'utf-8')
  console.log(`서버 저장소(${ref})에서 스펙을 가져왔습니다.`)
}

// 내용이 스펙 모양인지 최소한 확인한다. 404 HTML 을 그대로 저장해 두면 대조가 통째로 무의미해진다.
const spec = JSON.parse(readFileSync(TARGET, 'utf-8'))
const paths = Object.keys(spec.paths ?? {}).length
if (paths < 100) {
  console.error(`스펙 경로가 ${paths}개뿐입니다. 파일이 잘못된 것 같아 실패로 처리합니다.`)
  process.exit(1)
}
console.log(`경로 ${paths}개, 스키마 ${Object.keys(spec.components?.schemas ?? {}).length}개`)
