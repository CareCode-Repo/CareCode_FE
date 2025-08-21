'use client'

import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
// import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Layout from '@/components/common/Layout'
import MainSection from '@/components/common/MainSection'
import Separator from '@/components/common/Separator'
import Spacer from '@/components/common/Spacer'
import Input from '@/components/common/input'
import ChatSection from '@/components/features/chat/ChatSection'
import PopularPost from '@/components/features/community/popular-post'
import PolicyCard from '@/components/features/policy/PolicyCard'
import { useGetLatestPolicies } from '@/queries/policy'
import { convertPolicyToCardProps } from '@/types/policy'

const Home = (): ReactElement => {
  const router = useRouter()
  // const handleNotificationClick = () => router.push('/notification')
  const handleSearchClick = () => router.push('/search')
  const { data: policies, isLoading, error } = useGetLatestPolicies()

  return (
    <Layout
      hasTopNav
      title="홈"
      // actionButtons={[{ icon: BellIcon, onClick: handleNotificationClick }]}
    >
      <div className="px-4.5">
        <Spacer className="h-5 shrink-0" />
        <Input
          value=""
          placeholder="궁금한 정책이 있으신가요?"
          rightIcon={<SearchIcon className="size-6 cursor-pointer fill-gray-400" />}
          onClick={handleSearchClick}
          readOnly
        />
        <Spacer className="h-5" />
        <div className="flex flex-col gap-4">
          <ChatSection />
          <MainSection title="최근 정책">
            <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-4 [&>*]:w-64 [&>*]:flex-shrink-0">
              {isLoading ? (
                <div className="h-40 w-64 animate-pulse rounded-lg bg-gray-200" />
              ) : error ? (
                <div className="flex h-40 w-64 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  정책 목록을 불러올 수 없습니다.
                </div>
              ) : (
                policies?.map((policy) => {
                  const cardProps = convertPolicyToCardProps(policy)
                  return <PolicyCard key={cardProps.id} {...cardProps} />
                })
              )}
            </div>
          </MainSection>
          <MainSection title="인기 게시글">
            <div className="flex flex-col px-4 pb-4">
              {[...Array(3).keys()].map((_, index) => (
                <div key={index}>
                  <PopularPost
                    key={index}
                    content="이것은 인기 게시글의 내용입니다."
                    likeCount={10}
                    commentCount={5}
                    createdDate="2023-10-01"
                    createdTime="12:00"
                  />
                  {index < 2 && <Separator />}
                </div>
              ))}
            </div>
          </MainSection>
        </div>
        <Spacer className="h-5" />
      </div>
    </Layout>
  )
}

export default Home
