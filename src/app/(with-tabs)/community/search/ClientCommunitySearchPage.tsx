'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { JSX, useEffect, useRef } from 'react'
import { useSearchPosts } from './hooks/useSearchPosts'
import BabyIcon from '@/assets/icons/baby.svg'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Input from '@/components/common/input'
import { useInput } from '@/components/common/input/hooks/useInput'
import TopNavBar from '@/components/common/top-navbar'
import IconButton from '@/components/common/top-navbar/IconButton'
import CommunityPost from '@/components/features/community/community-post-list'

export default function ClientCommunitySearchPage(): JSX.Element {
  const params = useSearchParams()
  const router = useRouter()
  const keyword = params.get('keyword') ?? '' // 없으면 빈 문자열
  const searchInput = useInput(keyword)
  const { posts, fetchNextPage, isFetchingNextPage, hasNextPage } = useSearchPosts(keyword)
  const loader = useRef<HTMLDivElement>(null)

  const handleSearch = () => {
    router.push(`/community/search?keyword=${encodeURIComponent(searchInput.value)}&page=0&size=10`)
  }

  useEffect(() => {
    const currentLoader = loader.current
    if (!currentLoader) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null, // viewport 기준
        rootMargin: '200px', // 화면 아래 200px에 들어오면 호출
        threshold: 0, // entry가 조금이라도 보이면 실행
      },
    )

    observer.observe(currentLoader)

    return () => {
      observer.unobserve(currentLoader)
    }
  }, [fetchNextPage, isFetchingNextPage])
  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="scrollbar-hide grow overflow-y-scroll">
        <TopNavBar
          title="검색결과"
          actionButtons={[{ icon: BellIcon, showBadge: true }]}
          isSticky={true}
          hasBackButton
          onBackButtonClick={() => router.back()}
        />

        <div className="flex p-[1.125rem]">
          <Input
            value={searchInput.value}
            onChange={searchInput.onChange}
            placeholder="검색어를 입력하세요"
            rightIcon={
              <IconButton
                icon={SearchIcon}
                iconClassName="size-6 fill-gray-400"
                onClick={handleSearch}
              />
            }
          />
        </div>

        <div className="flex flex-col divide-y divide-gray-200">
          {posts.map((post, index) => (
            <CommunityPost key={index} post={post} />
          ))}

          <div
            ref={loader}
            className="text-c1-regular flex items-center justify-center bg-white py-3 text-gray-500"
          >
            <div className="text-c1-regular flex items-center justify-center bg-white py-3 text-gray-500">
              {posts.length === 0 ? (
                <span>게시글이 없습니다.</span>
              ) : hasNextPage ? (
                <BabyIcon className="size-8 fill-green-200" />
              ) : (
                '마지막 게시글입니다.'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
