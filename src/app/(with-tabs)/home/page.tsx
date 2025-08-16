'use client'
import { ReactElement } from 'react'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import MainSection from '@/components/common/MainSection'
import Separator from '@/components/common/Separator'
import Spacer from '@/components/common/Spacer'
import Input from '@/components/common/input'
import TopNavBar from '@/components/common/top-navbar'
import ChatSection from '@/components/features/chat/ChatSection'
import PopularPost from '@/components/features/community/popular-post'
import PolicyCard from '@/components/features/policy/PolicyCard'

const Home = (): ReactElement => {
  return (
    <div className="flex flex-col h-full">
      <TopNavBar title="홈" actionButtons={[{ icon: BellIcon }]} />
      <div className="px-4.5 grow overflow-y-scroll flex flex-col bg-gray-50">
        <Spacer className="h-5 shrink-0" />
        <Input
          value=""
          placeholder="무엇을 찾고 계신가요?"
          rightIcon={<SearchIcon className="size-6 fill-gray-400 cursor-pointer" />}
        />
        <Spacer className="h-5" />
        <div className="flex flex-col gap-4">
          <ChatSection />
          <MainSection title="최근 정책">
            <div className="px-4 pb-4 flex gap-3 overflow-x-auto scrollbar-hide [&>*]:w-64 [&>*]:flex-shrink-0">
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
            <div className="px-4 pb-4 flex flex-col">
              <PopularPost
                content="이것은 인기 게시글의 내용입니다."
                likeCount={10}
                commentCount={5}
                createdDate="2023-10-01"
                createdTime="12:00"
              />
              <Separator />
              <PopularPost
                content="이것은 인기 게시글의 내용입니다. 여러 줄로 작성할 수 있습니다.dddddd"
                likeCount={10}
                commentCount={5}
                createdDate="2023-10-01"
                createdTime="12:00"
              />
              <Separator />
              <PopularPost
                content="이것은 인기 게시글의 내용입니다. 여러 줄로 작성할 수 있습니다.dddddd"
                likeCount={10}
                commentCount={5}
                createdDate="2023-10-01"
                createdTime="12:00"
              />
              <Separator />
              <PopularPost
                content="이것은 인기 게시글의 내용입니다. 여러 줄로 작성할 수 있습니다.dddddd"
                likeCount={10}
                commentCount={5}
                createdDate="2023-10-01"
                createdTime="12:00"
              />
            </div>
          </MainSection>
        </div>
        <Spacer className="h-5" />
      </div>
    </div>
  )
}

export default Home
