'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { JSX, useEffect, useRef, useState } from 'react'
import { usePosts } from './hooks/usePosts'
import BabyIcon from '@/assets/icons/baby.svg'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Chip from '@/components/common/Chip'
import Input from '@/components/common/input'
import { useInput } from '@/components/common/input/hooks/useInput'
import TopNavBar from '@/components/common/top-navbar'
import IconButton from '@/components/common/top-navbar/IconButton'
import NewPostFAB from '@/components/features/community/NewPostFAB'
import CommunityPost from '@/components/features/community/community-post-list'

const Community = (): JSX.Element => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts({ page: 0, size: 10 })
  const searchInput = useInput('')
  const loader = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const [searchFocused, setSearchFocused] = useState<boolean>(false)
  const [recentKeywords, setRecentKeywords] = useState<string[]>(['아동', '육아', '임신', '출산'])

  const handleDeleteKeyword = (keyword: string) => {
    setRecentKeywords((prev) => prev.filter((k) => k !== keyword)) //temp
  }
  const handleRecentKeywordClick = (keyword: string) => {
    router.push(`/community/search?keyword=${encodeURIComponent(keyword)}&page=0&size=10`)
  }
  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="scrollbar-hide grow overflow-y-scroll">
        <motion.div
          className={`${clsx(searchFocused && 'hidden')}`}
          animate={{ y: searchFocused ? -64 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <TopNavBar
            title="커뮤니티"
            actionButtons={[{ icon: BellIcon, showBadge: true }]}
            isSticky={true}
          />
        </motion.div>

        <div className="flex p-[1.125rem]">
          <Input
            value={searchInput.value}
            onChange={searchInput.onChange}
            onFocus={() => setSearchFocused(true)}
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

        {searchFocused ? (
          <div className="flex w-full p-[1.125rem]">
            <div className="flex w-full flex-col items-start justify-start gap-6">
              <div className="inline-flex items-start justify-between self-stretch">
                <div className="justify-start text-justify font-['Inter'] text-sm leading-tight font-semibold text-neutral-700">
                  최근 검색어
                </div>
                <button
                  onClick={() => setRecentKeywords([])}
                  className="justify-start text-justify font-['Inter'] text-sm leading-tight font-normal text-zinc-600"
                >
                  전체삭제
                </button>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5">
                {recentKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    size="md"
                    shape="round"
                    color="transparent"
                    deletable={true}
                    onClick={() => handleRecentKeywordClick(keyword)}
                    onDelete={() => handleDeleteKeyword(keyword)}
                  >
                    {keyword}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-200">
            {posts.map((post, index) => (
              <CommunityPost key={index} post={post} />
            ))}

            <div
              ref={loader}
              className="text-c1-regular flex items-center justify-center bg-white py-3 text-gray-500"
            >
              {hasNextPage ? (
                <BabyIcon className="size-8 fill-green-200" />
              ) : (
                '마지막 게시글입니다.'
              )}
            </div>
          </div>
        )}
      </div>

      {searchFocused && <NewPostFAB />}
    </div>
  )
}

export default Community
