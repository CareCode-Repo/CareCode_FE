'use client'

import Button from '@/components/common/button'
import { useState } from 'react'
import WarningIcon from '@/assets/icons/warning.svg'
import KebabIcon from '@/assets/icons/edit.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import TrachIcon from '@/assets/icons/trash.svg'
import { Menubox } from '@/components/common/menubox'
import Switch from '@/components/common/switch'
import ToggleButton from '@/components/common/toggle-button'
import ToggleChip from '@/components/common/toggle-chip'
import Chip from '@/components/common/chip'
import AlertDialog from '@/components/common/alert-dialog'

export default function ComponentTest() {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      {/* svg 아이콘 테스트 */}
      <WarningIcon className="w-6 h-6 fill-red-500" />
      {/* alert 다이얼로그 테스트 */}
      <Button color="green" size="full" onClick={() => setIsOpen(true)}>
        버튼
      </Button>
      <AlertDialog
        title="Dialog Title"
        description="This is a description for the dialog."
        isOpen={isOpen}
        onClose={handleClose}
        buttons={
          <div className="flex justify-end gap-2">
            <Button color="gray" size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="red" size="small" onClick={handleClose}>
              Confirm
            </Button>
          </div>
        }
      />
      {/* 드롭다운메뉴 테스트 */}
      <Menubox
        triggerButton={<KebabIcon className="w-6 h-6 cursor-pointer" />}
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
        color="black"
        shape="round"
        deletable
        onDelete={() => console.log('칩 삭제됨')}
      >
        Text
      </Chip>
    </div>
  )
}
