import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TimelineItem from '@/components/features/child/TimelineItem'
import { TimelineItem as TimelineItemData } from '@/types/apis/child'

const item = (overrides: Partial<TimelineItemData> = {}): TimelineItemData => ({
  date: '2026-11-03',
  type: 'VACCINATION',
  status: 'UPCOMING',
  title: 'B형간염 3차',
  description: '권장 접종 시기입니다.',
  referenceId: '12',
  ageMonths: 13,
  ...overrides,
})

describe('TimelineItem', () => {
  it('날짜·월령·종류·상태를 함께 보여준다', () => {
    render(<TimelineItem item={item()} />)

    expect(screen.getByText('11.03')).toBeInTheDocument()
    expect(screen.getByText('13개월')).toBeInTheDocument()
    expect(screen.getByText('B형간염 3차')).toBeInTheDocument()
    expect(screen.getByText('예방접종')).toBeInTheDocument()
    expect(screen.getByText('예정')).toBeInTheDocument()
  })

  it('기한이 지난 일은 경과로 표시한다 — 지난 일이라고 흐리게 두면 놓친 걸 모른다', () => {
    render(<TimelineItem item={item({ status: 'OVERDUE' })} />)

    expect(screen.getByText('기한 경과')).toBeInTheDocument()
  })

  it('완료한 일은 완료로 표시한다', () => {
    render(<TimelineItem item={item({ type: 'CHECKUP', status: 'DONE', title: '3차 건강검진' })} />)

    expect(screen.getByText('완료')).toBeInTheDocument()
    expect(screen.getByText('건강검진')).toBeInTheDocument()
  })

  it('참고 항목(신학기)은 참고로 표시한다', () => {
    render(
      <TimelineItem
        item={item({
          type: 'NEW_TERM',
          status: 'INFO',
          title: '3월 신학기',
          description: '신청 일정은 시설마다 다르므로 관심 시설에 직접 확인하세요.',
          ageMonths: null,
          referenceId: null,
        })}
      />,
    )

    expect(screen.getByText('참고')).toBeInTheDocument()
    expect(screen.getByText('신학기')).toBeInTheDocument()
    expect(screen.getByText(/시설마다 다르므로/)).toBeInTheDocument()
  })

  it('서버가 모르는 종류·상태를 보내도 원본 값을 보여주고 화면은 살아 있다', () => {
    render(<TimelineItem item={item({ type: 'SOMETHING_NEW', status: 'WEIRD' })} />)

    expect(screen.getByText('SOMETHING_NEW')).toBeInTheDocument()
    expect(screen.getByText('B형간염 3차')).toBeInTheDocument()
  })
})
