'use client'

import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Layout from '@/components/common/Layout'
import MainSection from '@/components/common/MainSection'
import Separator from '@/components/common/Separator'
import Spacer from '@/components/common/Spacer'
import Input from '@/components/common/input'
import ChatSection from '@/components/features/chat/ChatSection'
import PopularPost from '@/components/features/community/popular-post'
import PolicyCard from '@/components/features/policy/PolicyCard'
// import { useGetPolicyList } from '@/queries/policy'

const Home = (): ReactElement => {
  const router = useRouter()
  const handleNotificationClick = () => router.push('/notification')
  // TODO: API 연동 시 아래 주석 해제하고 더미 데이터 제거
  // const { data: policies, isLoading, error } = useGetPolicyList()
  // 임시 더미 데이터 (API 연동 후 제거)
  const dummyPolicies = [
    {
      id: 1,
      title: '영유아 건강검진 지원',
      description: '생후 24~48개월 영유아 건강검진 비용 지원',
      category: '건강검진',
      region: '경기도',
      targetAge: '생후 24개월 ~ 48개월 미만 아동',
      applicationPeriod: '매월 1~15일',
      type: '매월' as const,
    },
    {
      id: 2,
      title: '어린이집 입소 우선순위',
      description: '맞벌이 가정 어린이집 입소 우선 지원',
      category: '보육지원',
      region: '서울시',
      targetAge: '만 0세 ~ 5세',
      applicationPeriod: '상시 신청 가능',
      type: '상시접수' as const,
    },
    {
      id: 3,
      title: '육아휴직 급여 지원',
      description: '육아휴직 기간 중 생계비 지원 (최대 12개월)',
      category: '급여지원',
      region: '전국',
      targetAge: '만 8세 이하 자녀',
      applicationPeriod: '2024년 12월 31일까지',
      type: 'D-Day' as const,
      dday: 45,
    },
    {
      id: 4,
      title: '신생아 양육용품 지원',
      description: '신생아 가정에 기저귀, 분유 등 양육용품 지원',
      category: '물품지원',
      region: '부산시',
      targetAge: '생후 0개월 ~ 12개월',
      applicationPeriod: '선착순 100명',
      type: '선착순' as const,
    },
    {
      id: 5,
      title: '다자녀 가정 교육비 지원',
      description: '3자녀 이상 가정 교육비 및 학용품 지원',
      category: '교육지원',
      region: '인천시',
      targetAge: '초등학생 ~ 고등학생',
      applicationPeriod: '학기별 신청',
      type: '상시접수' as const,
    },
  ]

  return (
    <Layout
      hasTopNav
      title="홈"
      actionButtons={[{ icon: BellIcon, onClick: handleNotificationClick }]}
    >
      <div className="px-4.5">
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
              {/* TODO: API 연동 시 아래 주석 해제
              {isLoading ? (
                <div className="w-64 h-40 bg-gray-200 animate-pulse rounded-lg" />
              ) : error ? (
                <div className="w-64 h-40 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                  정책 목록을 불러올 수 없습니다.
                </div>
              ) : (
                policies?.slice(0, 5).map((policy) => (
                  <PolicyCard
                    key={policy.id}
                    type={convertCategoryToPolicyType(policy.category)}
                    tags={[policy.category]}
                    title={policy.title}
                    description={policy.description}
                    region={policy.region}
                    targetAge={policy.targetAge}
                    applicationPeriod={policy.applicationPeriod || '상시 신청 가능'}
                    onClick={() => console.log(`정책 ${policy.id} 클릭됨`)}
                  />
                ))
              )}
              */}

              {/* 임시 더미 데이터 렌더링 (API 연동 후 제거) */}
              {dummyPolicies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  {...policy}
                  tags={[policy.category]}
                  applicationPeriod={policy.applicationPeriod || '상시 신청 가능'}
                  onClick={() => console.log(`정책 ${policy.id} 클릭됨`)}
                />
              ))}
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
    </Layout>
  )
}

export default Home
