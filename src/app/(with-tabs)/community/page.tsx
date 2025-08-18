'use client'
import { JSX, useCallback, useEffect, useRef, useState } from 'react'
import { dummyCommunityPosts } from './postListDummy'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import CommunityPost from '@/components/features/community/CommunityPost'

import NewPostFAB from '@/components/features/community/NewPostFAB'
import { PostListItem } from '@/types/apis/community'

const POSTS_PER_PAGE = 3

const Community = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<PostListItem[]>(dummyCommunityPosts.slice(0, 3))
  const loader = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSearch = () => {}

  const loadMore = useCallback(() => {
    const nextPage = page + 1
    const start = page * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE
    const nextPosts = dummyCommunityPosts.slice(start, end)

    if (nextPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...nextPosts])
      setPage(nextPage)
    }
  }, [page]) // page가 변경될 때마다 이 함수가 재생성됩니다.

  useEffect(() => {
    const currentLoader = loader.current
    const observer = new IntersectionObserver(
      (entries) => {
        // isIntersecting이 true일 때만 loadMore를 호출하도록 확인
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.8 },
    )

    if (currentLoader) {
      observer.observe(currentLoader)
    }

    // cleanup 함수에서 observer 연결을 해제합니다.
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [loadMore])

  return (
    <div className="h-screen bg-white">
      <header
        id="topNavigator"
        className="sticky top-0 z-1 flex items-center justify-between bg-white py-3.5 pr-[0.9375rem] pl-5"
      >
        <div className="text-h3-bold text-black">커뮤니티</div>
        <button>
          <BellIcon className="size-8 fill-black" />
        </button>
      </header>

      <div id="searchBar" className="flex items-center p-[1.125rem]">
        <div className="flex w-full items-center justify-between gap-2 rounded-[0.375rem] border-[1px] border-gray-400 bg-white px-2 py-3">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            className="w-full border-none bg-transparent outline-none"
          />
          <button onClick={handleSearch}>
            <SearchIcon className="size-6 fill-gray-400" />
          </button>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        {posts.map((post, index) => (
          <CommunityPost key={index} post={post} />
        ))}

        <div
          ref={loader}
          className="text-c1-regular flex items-center justify-center bg-white py-3 text-gray-500"
        >
          {posts.length < dummyCommunityPosts.length ? 'Loading...' : '마지막 게시글입니다.'}
        </div>
      </div>

      <NewPostFAB />
    </div>
  )
}

export default Community
