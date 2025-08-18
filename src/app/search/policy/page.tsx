'use client'
import { ReactElement, RefObject, use, useEffect, useRef } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import Layout from '@/components/common/Layout'
import Spacer from '@/components/common/Spacer'
import ToggleChip from '@/components/common/ToggleChip'
import Input from '@/components/common/input'
import PolicyCard from '@/components/features/policy/PolicyCard'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useSearchPolicy } from '@/hooks/useSearchPolicy'

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
const ioOptions = {
  threshold: 0,
  delay: 0,
}
interface PolicySearchPageProps {
  searchParams: Promise<{
    keyword?: string
  }>
}

const PolicySearchPage = ({ searchParams }: PolicySearchPageProps): ReactElement => {
  const { keyword } = use(searchParams)
  const { inputValue, handleInputChange, performSearch } = useSearchPolicy(keyword || '')
  const {} = useSearchPolicy(keyword || '')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const {
    entries: [entry],
  } = useIntersectionObserver(loadMoreRef as RefObject<HTMLElement>, ioOptions)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.length === 0) return
    performSearch(inputValue)
  }
  const isIntersecting = entry?.isIntersecting
  console.log('isIntersecting', isIntersecting)
  // console.log('data', data);
  useEffect(() => {
    if (isIntersecting) {
      // fetchNextPage()
      console.log('Fetching next page...')
    }
  }, [isIntersecting])
  return (
    <Layout
      hasTopNav
      hasBackButton
      title="검색 결과"
      contentClassName="overflow-y-scroll pt-6 px-4.5 bg-white"
    >
      <form onSubmit={handleSubmit}>
        <Input
          value={inputValue}
          placeholder="검색어를 입력하세요"
          onChange={handleInputChange}
          rightIcon={<SearchIcon className="size-6 fill-gray-400 cursor-pointer" />}
        />
      </form>
      <Spacer className="h-9 shrink-0" />
      <div className="flex flex-col gap-3">
        <span className="text-b1-semibold text-gray-800">정책 정보 135건</span>
        <div className="flex gap-2">
          <ToggleChip>최신일순</ToggleChip>
          <ToggleChip>마감일순</ToggleChip>
        </div>
      </div>
      <Spacer className="h-3 shrink-0" />
      <div className="h-full flex flex-col gap-2 grow overflow-y-scroll [&>*]:shrink-0 scrollbar-hide">
        {dummyPolicies.map((policy) => (
          <PolicyCard
            key={policy.id}
            {...policy}
            tags={[policy.category]}
            applicationPeriod={policy.applicationPeriod || '상시 신청 가능'}
            onClick={() => console.log(`정책 ${policy.id} 클릭됨`)}
          />
        ))}
        <div ref={loadMoreRef} />
      </div>
    </Layout>
  )
}

export default PolicySearchPage
