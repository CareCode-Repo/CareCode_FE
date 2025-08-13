'use client'

import { ReactElement, useState } from 'react'
import KebabIcon from '@/assets/icons/edit.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import TrachIcon from '@/assets/icons/trash.svg'
import WarningIcon from '@/assets/icons/warning.svg'
import AlertDialog from '@/components/common/alert-dialog'
import Button from '@/components/common/button'
import Chip from '@/components/common/chip'
import { Menubox } from '@/components/common/menubox'
import Switch from '@/components/common/switch'
import ToggleButton from '@/components/common/toggle-button'
import ToggleChip from '@/components/common/toggle-chip'
import FacilityCard from '@/components/features/facility/facility-card'
import PolicyCard from '@/components/features/policy/policy-card'

export default function ComponentTest(): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      {/* button 테스트 */}
      <Button color="green" size="large" disabled>
        Green Full Button
      </Button>
      {/* svg 아이콘 테스트 */}
      <WarningIcon className="w-6 h-6 fill-red" />
      {/* alert 다이얼로그 테스트 */}
      <Button color="green" size="large" onClick={() => setIsOpen(true)}>
        버튼
      </Button>
      <AlertDialog
        title="Dialog Title"
        description="This is a description for the dialog."
        isOpen={isOpen}
        onClose={handleClose}
        cancelButton={
          <Button color="gray" size="small" onClick={handleClose}>
            Cancel
          </Button>
        }
        confirmButton={
          <Button color="red" size="small" onClick={handleClose}>
            Confirm
          </Button>
        }
      />
      {/* 드롭다운메뉴 테스트 */}
      <Menubox
        triggerButton={<KebabIcon className="w-6 h-6 cursor-pointer fill-black" />}
        items={[
          {
            content: '수정',
            icon: PencilIcon,
            onSelect: () => console.log('수정 클릭됨'),
          },
          {
            content: '삭제',
            icon: TrachIcon,
            variant: 'destructive',
            onSelect: () => console.log('삭제 클릭됨'),
          },
        ]}
      />
      {/* 스위치 테스트 */}
      <Switch />
      {/* 토글버튼 테스트 */}
      <ToggleButton onPressedChange={() => console.log('토글 상태 변경됨')}>부모</ToggleButton>
      {/* 칩, 토글칩 테스트 */}
      <ToggleChip onPressedChange={() => console.log('토글칩 상태 변경됨')}>Chip</ToggleChip>
      <Chip size="sm">Text</Chip>
      <Chip size="md" color="purple">
        Text
      </Chip>
      <Chip size="md" color="blue" shape="round">
        Text
      </Chip>
      <Chip
        size="md"
        color="white"
        shape="round"
        deletable
        onDelete={() => console.log('칩 삭제됨')}
      >
        Text
      </Chip>
      <Chip
        size="md"
        color="black"
        shape="round"
        deletable
        onDelete={() => console.log('칩 삭제됨')}
      >
        Text
      </Chip>
      <div className="mt-4 flex flex-col gap-4">
        <PolicyCard
          type="상시접수"
          tags={['건강검진', '서비스지원']}
          title="경기형 가족돌봄수당"
          description="생후 24~48개월 미만 아동 돌보는 친인척/이웃에게 60만원"
          region="경기도 '건강검진', '서비스지원' 생후 24~48개월 미만 아동 돌보는 친인척/이웃에게 60만원 생후 24~48개월 미만 아동 돌보는 친인척/이웃에게 60만원"
          targetAge="생후 24개월 ~ 48개월 미만 아동대상"
          applicationPeriod="매월 1~15일 온라인 신청"
          onClick={() => console.log('정책 카드 클릭됨')}
        />
        <FacilityCard
          type="센터"
          tags={['건강검진', '서비스지원']}
          title="아이사랑 어린이집"
          region="경기도 고양시 일산동구"
          phoneNumber="031-123-4567"
          reviewCount={10}
          rating={4.5}
          onClick={() => console.log('시설 카드 클릭됨')}
        />
        <FacilityCard
          type="어린이집"
          tags={['건강검진', '서비스지원']}
          title="아이사랑 어린이집"
          region="경기도 고양시 일산동구"
          phoneNumber="031-123-4567"
          reviewCount={10}
          rating={4.5}
          onClick={() => console.log('시설 카드 클릭됨')}
        />
        <FacilityCard
          type="유치원"
          tags={['건강검진', '서비스지원']}
          title="아이사랑 어린이집"
          region="경기도 고양시 일산동구"
          phoneNumber="031-123-4567"
          reviewCount={10}
          rating={4.5}
          onClick={() => console.log('시설 카드 클릭됨')}
        />
      </div>
    </div>
  )
}
