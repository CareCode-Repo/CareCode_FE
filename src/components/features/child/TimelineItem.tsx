import clsx from 'clsx'
import { ReactElement } from 'react'
import Chip from '@/components/common/Chip'
import {
  TIMELINE_TYPE_LABEL,
  TimelineItem as TimelineItemData,
  TimelineItemType,
} from '@/types/apis/child'
import { formatDate } from '@/utils/date'

interface TimelineItemProps {
  item: TimelineItemData
}

/** 상태별 표시. 서버가 새 상태를 추가하면 회색 기본값으로 보여 주고 화면은 살려 둔다. */
const STATUS_STYLE: Record<string, { label: string; color: 'red' | 'green' | 'blue' | 'white' }> = {
  OVERDUE: { label: '기한 경과', color: 'red' },
  UPCOMING: { label: '예정', color: 'green' },
  DONE: { label: '완료', color: 'blue' },
  INFO: { label: '참고', color: 'white' },
}

const TimelineItem = ({ item }: TimelineItemProps): ReactElement => {
  const status = STATUS_STYLE[item.status]
  const typeLabel = TIMELINE_TYPE_LABEL[item.type as TimelineItemType] ?? item.type
  const isOverdue = item.status === 'OVERDUE'
  const isDone = item.status === 'DONE'

  return (
    <li
      className={clsx(
        'flex gap-3 border-b border-gray-200 px-4.5 py-3.5 last:border-b-0',
        isDone && 'bg-gray-50',
      )}
    >
      {/* 날짜 열. 세로 축처럼 보이게 왼쪽에 고정 폭으로 둔다. */}
      <div className="flex w-14 shrink-0 flex-col items-center pt-0.5">
        <span className={clsx('text-b2-semibold', isOverdue ? 'text-red' : 'text-gray-700')}>
          {formatDate(item.date, 'MM.dd')}
        </span>
        {item.ageMonths != null && (
          <span className="text-c1-regular text-gray-500">{item.ageMonths}개월</span>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={clsx(
              'text-b1-semibold',
              isDone ? 'text-gray-500 line-through' : 'text-gray-800',
            )}
          >
            {item.title}
          </span>
          <Chip color="transparent" size="sm">
            {typeLabel}
          </Chip>
          {status && (
            <Chip color={status.color} size="sm">
              {status.label}
            </Chip>
          )}
        </div>
        {item.description && (
          <span className="text-b2-regular whitespace-pre-line text-gray-600">
            {item.description}
          </span>
        )}
      </div>
    </li>
  )
}

export default TimelineItem
