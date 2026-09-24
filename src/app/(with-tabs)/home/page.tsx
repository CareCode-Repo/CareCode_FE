'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import ContextBar from '@/components/common/ContextBar'
import Layout from '@/components/common/Layout'
import MainSection from '@/components/common/MainSection'
import Separator from '@/components/common/Separator'
import Input from '@/components/common/input'
import ChatSection from '@/components/features/chat/ChatSection'
import PopularPost from '@/components/features/community/popular-post'
import QuickMenu from '@/components/features/home/QuickMenu'
import TodoSection from '@/components/features/home/TodoSection'
import PolicyCard from '@/components/features/policy/PolicyCard'
import RecommendedPolicyCard from '@/components/features/policy/RecommendedPolicyCard'
import { useGetCommunityPopular } from '@/queries/community'
import { useGetLatestPolicies, usePolicyRecommendations } from '@/queries/policy'
import { convertPolicyToCardProps } from '@/types/policy'

/**
 * 홈.
 *
 * 순서가 이 화면의 전부다. 기한이 걸린 것(지금 할 일)이 가장 위에 오고, 그다음이 이 아이에게
 * 맞는 지원금, 찾아보는 수단(검색·퀵메뉴)은 그 아래다. 예전에는 검색창과 퀵메뉴와 배너가
 * 첫 화면의 절반을 차지해서, 정작 놓치면 사라지는 것들이 스크롤 아래에 있었다.
 *
 * 상단바는 화면 이름 대신 기준(아이 · 지역)을 보여준다 — ContextBar.
 */
const Home = (): ReactElement => {
  const router = useRouter()
  const { data: policies, isLoading, error } = useGetLatestPolicies()
  const {
    data: popularPosts,
    isLoading: isPopularLoading,
    error: popularError,
  } = useGetCommunityPopular()
  const { data: recommendations, isLoading: isRecommendationLoading } = usePolicyRecommendations(3)

  return (
    <Layout hasTopNav={false}>
      <ContextBar title="홈" />

      <div className="flex flex-col gap-6 px-4.5 pt-1 pb-6">
        <TodoSection />

        <MainSection title="이 아이에게 맞는 지원금">
          <div className="flex flex-col gap-3 px-4 pb-4">
            {isRecommendationLoading ? (
              [0, 1].map((index) => (
                <div key={index} className="h-24 animate-pulse rounded-lg bg-gray-200" />
              ))
            ) : !recommendations?.length ? (
              <p className="text-b2-regular text-gray-600">
                아이를 등록하면 월령과 거주지에 맞는 지원금을 찾아드려요.
              </p>
            ) : (
              recommendations.map((recommendation) => (
                <RecommendedPolicyCard
                  key={recommendation.policy.id}
                  recommendation={recommendation}
                  onClick={() => router.push(`/policy/${recommendation.policy.id}`)}
                />
              ))
            )}
          </div>
        </MainSection>

        {/* 찾아보는 수단은 할 일 아래에 둔다 */}
        <section aria-labelledby="explore-title" className="flex flex-col gap-2.5">
          <h2 id="explore-title" className="text-t2-semibold text-black">
            찾아보기
          </h2>
          <Input
            value=""
            placeholder="궁금한 정책이 있으신가요?"
            rightIcon={<SearchIcon className="size-6 cursor-pointer fill-gray-400" />}
            onClick={() => router.push('/search')}
            readOnly
          />
          <QuickMenu />
          <ChatSection />
        </section>

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
            {isPopularLoading ? (
              [...Array(5).keys()].map((index) => (
                <div key={index}>
                  <div className="flex h-16 animate-pulse items-center py-2">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="h-3 w-1/2 rounded bg-gray-200" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-12 rounded bg-gray-200" />
                      <div className="h-6 w-12 rounded bg-gray-200" />
                    </div>
                  </div>
                  {index < 4 && <Separator />}
                </div>
              ))
            ) : popularError ? (
              <div className="flex h-40 items-center justify-center text-red-600">
                인기 게시글을 불러올 수 없습니다.
              </div>
            ) : (
              popularPosts?.content?.map((post, index) => (
                <div key={post.postId}>
                  <PopularPost
                    content={post.title}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    createdDate={format(new Date(post.createdAt), 'MM-dd')}
                    createdTime={format(new Date(post.createdAt), 'HH:mm')}
                    onClick={() => router.push(`/community/${post.postId}`)}
                  />
                  {index < popularPosts.content.length - 1 && <Separator />}
                </div>
              ))
            )}
          </div>
        </MainSection>
      </div>
    </Layout>
  )
}

export default Home
