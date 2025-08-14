'use client'

import { ReactElement, useState } from 'react'
import KebabIcon from '@/assets/icons/edit.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import TrachIcon from '@/assets/icons/trash.svg'
import WarningIcon from '@/assets/icons/warning.svg'
import AlertDialog from '@/components/common/alert-dialog'
import Button from '@/components/common/button'
import Chip from '@/components/common/chip'
import MainSection from '@/components/common/main-section'
import { Menubox } from '@/components/common/menubox'
import Switch from '@/components/common/switch'
import ToggleButton from '@/components/common/toggle-button'
import ToggleChip from '@/components/common/toggle-chip'
import ChatMessage from '@/components/features/chat/chat-message'
import ChatRecommendationList from '@/components/features/chat/chat-recommnendation-list'
import ActionButton from '@/components/features/community/action-button'
import Comment from '@/components/features/community/comment'
import CommunityPost from '@/components/features/community/community-post'
import FacilityCard from '@/components/features/facility/facility-card'
import MyPageMenuList from '@/components/features/mypage/menu-list'
import NotificationCard from '@/components/features/notification/notification-card'
import PolicyCard from '@/components/features/policy/policy-card'

export default function ComponentTest(): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  const mockComment = {
    author: '하늘이야빠',
    content: '모빌 정말 추천해요! 시각 발달에도 도움 된다고 하더라고요.',
    timestamp: '08/10 20:27',
    replies: [
      {
        author: '하늘이야빠',
        content: '모빌 정말 추천해요!',
        timestamp: '08/10 20:28',
      },
      {
        author: '하늘이야빠',
        content: '시각 발달에도 도움 된다고 하더라고요.',
        timestamp: '08/10 22:27',
      },
    ],
  }

  const mockMenuItems = [
    {
      id: '1',
      title: '소메뉴',
      onClick: () => console.log('1'),
    },
    {
      id: '2',
      title: '소메뉴',
      onClick: () => console.log('2'),
    },
    {
      id: '3',
      title: '소메뉴',
      onClick: () => console.log('3'),
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-5">
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
        </div>
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
            type="어린이집"
            tags={['건강검진', '서비스지원']}
            title="아이사랑 어린이집"
            region="경기도 고양시 일산동구"
            phoneNumber="031-123-4567"
            reviewCount={10}
            rating={4.5}
            onClick={() => console.log('시설 카드 클릭됨')}
          />
        </div>
        <div>
          <ChatMessage
            message="그렇군요. 어떤 종류의 육아 고민이신가요? 지금 겪고 계신 상황이나 걱정되는 점을 말씀해주시면, 구체적으로 도와드릴 수 있어요. 
                  예를 들어: 아이의 수면 습관이나 식사 문제, 감정 표현, 떼쓰기, 말 안 듣는 행동,유치원 적응이나 형제·자매 관계,
                  부모로서의 양육 스트레스 등 어떤 이야기든 괜찮으니, 편하게 말씀해 주세요."
            isMyMessage={false}
          />
          <ChatMessage message="안녕하세요! 어떻게 도와드릴까요?" isMyMessage={true} />
          <div className="flex flex-col gap-2"></div>
          <ChatRecommendationList
            recommendations={[
              '최근 육아정책',
              '육아 꿀템을\n추천해줘',
              '태교에 좋은 \n노래 5가지 추천해줘',
              '육아 관련 책\n추천해줘',
              '태교에 좋은 \n노래 5가지 추천해줘',
            ]}
            onRecommendationClick={(text) => console.log(`클릭됨: ${text}`)}
          />
          <NotificationCard
            timeAgo="2시간 전"
            title="새로운 정책이 등록되었습니다"
            content="경기도에서 새로운 가족돌봄수당 정책이 등록되었습니다. 자세한 내용은 정책 페이지를 확인하세요. 알림 내용 텍스트입니다.알림 내용 텍스트입니다."
            isRead={false}
            onClick={() => console.log('알림 카드 클릭됨')}
          />
          <NotificationCard
            timeAgo="2시간 전"
            title="새로운 정책이 등록되었습니다"
            content="경기도에서 새로운 가족돌봄수당 정책이 등록되었습니다. 자세한 내용은 정책 페이지를 확인하세요. 알림 내용 텍스트입니다.알림 내용 텍스트입니다."
            isRead={true}
            onClick={() => console.log('알림 카드 클릭됨')}
          />
        </div>
        <div>
          <CommunityPost
            title="게시글 제목"
            content="이것은 커뮤니티 게시글의 내용입니다. 여러 줄로 작성할 수 있습니다. 이것은 커뮤니티 게시글의 내용입니다. 여러 줄로 작성할 수 있습니다."
            author="작성자 이름"
            timeAgo="3시간 전"
          />
          <div className="flex gap-4.5">
            <ActionButton type="like" count={10} onClick={() => console.log('북마크 클릭됨')} />
            <ActionButton type="comment" count={10} onClick={() => console.log('북마크 클릭됨')} />
          </div>
        </div>
        <div>
          <Comment comment={mockComment} />
        </div>
      </div>
      <MyPageMenuList title="메뉴분류" items={mockMenuItems} />
      <div className="flex flex-col p-4">
        <MainSection title="최근 정책">
          <div className="px-4 flex gap-3 overflow-x-auto scrollbar-hide [&>*]:w-64 [&>*]:flex-shrink-0">
            <PolicyCard
              type="상시접수"
              tags={['건강검진', '서비스지원']}
              title={`정책 카드 1`}
              description="생후 24~48개월 60만원"
              region="경기도"
              targetAge="생후 24개월 ~ 48개월 미만 아동대상"
              applicationPeriod="매월 1~15일 온라인 신청"
              onClick={() => console.log(`정책 카드 1 클릭됨`)}
            />
            <PolicyCard
              type="상시접수"
              tags={['건강검진', '서비스지원']}
              title={`정책 카드 1`}
              description="생후 24~48개월 60만원 생후 24~48개월 60만원 생후 24~48개월 60만원"
              region="경기도"
              targetAge="생후 24개월 ~ 48개월 미만 아동대상"
              applicationPeriod="매월 1~15일 온라인 신청"
              onClick={() => console.log(`정책 카드 1 클릭됨`)}
            />
          </div>
        </MainSection>
        <MainSection title="인기 게시글">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide [&>*]:w-64 [&>*]:flex-shrink-0">
            <PolicyCard
              className="w-64"
              type="상시접수"
              tags={['건강검진', '서비스지원']}
              title={`정책 카드 1`}
              description="생후 24~48개월 60만원"
              region="경기도"
              targetAge="생후 24개월 ~ 48개월 미만 아동대상"
              applicationPeriod="매월 1~15일 온라인 신청"
              onClick={() => console.log(`정책 카드 1 클릭됨`)}
            />
            <PolicyCard
              className="grow-0"
              type="상시접수"
              tags={['건강검진', '서비스지원']}
              title={`정책 카드 1`}
              description="생후 24~48개월 60만원 생후 24~48개월 60만원 생후 24~48개월 60만원"
              region="경기도"
              targetAge="생후 24개월 ~ 48개월 미만 아동대상"
              applicationPeriod="매월 1~15일 온라인 신청"
              onClick={() => console.log(`정책 카드 1 클릭됨`)}
            />
          </div>
        </MainSection>
      </div>
    </div>
  )
}
