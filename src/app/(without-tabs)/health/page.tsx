'use client'
import { useRouter } from 'next/navigation'
import { ReactElement, useMemo, useState } from 'react'
import AuthGuard from '@/components/common/AuthGuard'
import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import ErrorView from '@/components/common/Error'
import Layout from '@/components/common/Layout'
import Spacer from '@/components/common/Spacer'
import ToggleChip from '@/components/common/ToggleChip'
import HealthRecordCard from '@/components/features/health/HealthRecordCard'
import { useMyChildren } from '@/queries/child'
import { useMyHealthRecords } from '@/queries/health'
import { RECORD_TYPE_LABEL, RecordType } from '@/types/apis/health'

const HealthPage = (): ReactElement => {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<RecordType | null>(null)
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null)

  const { data: records, isLoading, isError, refetch } = useMyHealthRecords()
  const { data: children = [] } = useMyChildren()

  // 서버에 아이/타입 동시 필터가 없어 클라이언트에서 걸러낸다 (기록 수가 많지 않은 화면).
  const filtered = useMemo(() => {
    if (!records) return []
    return records.filter(
      (record) =>
        (!selectedType || record.recordType === selectedType) &&
        (!selectedChildId || record.childId === selectedChildId),
    )
  }, [records, selectedType, selectedChildId])

  return (
    <AuthGuard>
      <Layout hasTopNav hasBackButton title="건강 기록" contentClassName="px-4.5 py-5">
        {children.length > 1 && (
          <>
            <div className="scrollbar-hide flex gap-2.5 overflow-x-auto [&>*]:shrink-0">
              {children.map((child) => (
                <ToggleChip
                  key={child.id}
                  pressed={selectedChildId === String(child.id)}
                  onPressedChange={(pressed) =>
                    setSelectedChildId(pressed ? String(child.id) : null)
                  }
                >
                  {child.name}
                </ToggleChip>
              ))}
            </div>
            <Spacer className="h-3 shrink-0" />
          </>
        )}

        <div className="scrollbar-hide flex gap-2.5 overflow-x-auto [&>*]:shrink-0">
          {(Object.keys(RECORD_TYPE_LABEL) as RecordType[]).map((type) => (
            <ToggleChip
              key={type}
              pressed={selectedType === type}
              onPressedChange={(pressed) => setSelectedType(pressed ? type : null)}
            >
              {RECORD_TYPE_LABEL[type]}
            </ToggleChip>
          ))}
        </div>

        <Spacer className="h-5 shrink-0" />

        {isLoading ? (
          <ul className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <li key={i} className="h-28 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </ul>
        ) : isError ? (
          <ErrorView content="건강 기록을 불러오지 못했어요." onRetry={() => refetch()} />
        ) : !children.length ? (
          <EmptyState
            title="먼저 아이를 등록해주세요"
            description={'건강 기록은 아이별로 저장돼요.'}
            actionLabel="아이 등록하기"
            onAction={() => router.push('/children/new')}
          />
        ) : !filtered.length ? (
          <EmptyState
            title={records?.length ? '조건에 맞는 기록이 없어요' : '아직 건강 기록이 없어요'}
            description={
              records?.length
                ? '필터를 해제해보세요.'
                : '검진 결과나 키·몸무게를 남기면\n성장 곡선에서 함께 볼 수 있어요.'
            }
            actionLabel={records?.length ? undefined : '기록 추가하기'}
            onAction={records?.length ? undefined : () => router.push('/health/new')}
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {filtered.map((record) => (
              <li key={record.id}>
                <HealthRecordCard
                  record={record}
                  onClick={() => router.push(`/health/${record.id}`)}
                />
              </li>
            ))}
          </ul>
        )}

        {children.length > 0 && (
          <Button
            color="green"
            size="small"
            className="mt-5"
            onClick={() => router.push('/health/new')}
          >
            기록 추가하기
          </Button>
        )}
      </Layout>
    </AuthGuard>
  )
}

export default HealthPage
