'use client'
import { JSX, useCallback, useEffect, useRef, useState } from 'react'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import CommunityPost from '@/components/features/community/CommunityPost'

import NewPostFAB from '@/components/features/community/NewPostFAB'
import { PostListItem } from '@/types/apis/community'

export const dummyCommunityPosts: PostListItem[] = [
  {
    id: 1,
    title: '첫 번째 게시글',
    content: '오늘 날씨가 정말 좋네요!',
    category: '일상',
    author: { userId: 'hong', name: '홍길동' },
    tags: ['일상'],
    viewCount: 123,
    likeCount: 10,
    commentCount: 2,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'React 공부중',
    content: 'React 18의 새로운 기능들을 정리했습니다.',
    category: '프론트엔드',
    author: { userId: 'lee', name: '이순신' },
    tags: ['React', '공부'],
    viewCount: 456,
    likeCount: 25,
    commentCount: 5,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Next.js 질문',
    content: 'getServerSideProps와 getStaticProps 차이가 뭔가요?',
    category: '프론트엔드',
    author: { userId: 'kang', name: '강감찬' },
    tags: ['Next.js', '질문'],
    viewCount: 78,
    likeCount: 3,
    commentCount: 1,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: '취미 공유',
    content: '최근에 사진 찍는 취미를 시작했어요!',
    category: '취미',
    author: { userId: 'yu', name: '유관순' },
    tags: ['사진', '취미'],
    viewCount: 200,
    likeCount: 15,
    commentCount: 3,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: '코딩 챌린지',
    content: '오늘 100일 코딩 챌린지 50일차 달성!',
    category: '코딩',
    author: { userId: 'jeong', name: '정약용' },
    tags: ['코딩', '챌린지'],
    viewCount: 150,
    likeCount: 12,
    commentCount: 4,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: '운동 기록',
    content: '오늘은 5km 조깅 성공!',
    category: '운동',
    author: { userId: 'shin', name: '신사임당' },
    tags: ['운동', '조깅'],
    viewCount: 90,
    likeCount: 8,
    commentCount: 1,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: '책 추천',
    content: '‘자바스크립트 완벽 가이드’ 추천합니다.',
    category: '독서',
    author: { userId: 'kim', name: '김유신' },
    tags: ['책', '추천', 'JS'],
    viewCount: 300,
    likeCount: 22,
    commentCount: 6,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: '맛집 후기',
    content: '최근에 간 카페가 정말 분위기 좋았어요.',
    category: '일상',
    author: { userId: 'jang', name: '장영실' },
    tags: ['카페', '맛집'],
    viewCount: 180,
    likeCount: 14,
    commentCount: 2,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    title: '여행 계획',
    content: '다음 달 제주도로 여행 갈 계획이에요.',
    category: '여행',
    author: { userId: 'sejong', name: '세종대왕' },
    tags: ['여행', '제주도'],
    viewCount: 220,
    likeCount: 18,
    commentCount: 5,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    title: '스터디 모집',
    content: 'React 스터디 참여하실 분 구합니다.',
    category: '스터디',
    author: { userId: 'hwang', name: '황희' },
    tags: ['React', '스터디'],
    viewCount: 140,
    likeCount: 10,
    commentCount: 3,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    title: '스터디 모집',
    content: 'React 스터디 참여하실 분 구합니다.',
    category: '스터디',
    author: { userId: 'hwang', name: '황희' },
    tags: ['React', '스터디'],
    viewCount: 145,
    likeCount: 11,
    commentCount: 2,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    title: '스터디 모집',
    content: 'React 스터디 참여하실 분 구합니다.',
    category: '스터디',
    author: { userId: 'hwang', name: '황희' },
    tags: ['React', '스터디'],
    viewCount: 150,
    likeCount: 12,
    commentCount: 4,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 13,
    title: '스터디 모집',
    content: 'React 스터디 참여하실 분 구합니다.',
    category: '스터디',
    author: { userId: 'hwang', name: '황희' },
    tags: ['React', '스터디'],
    viewCount: 155,
    likeCount: 13,
    commentCount: 3,
    isAnonymous: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 14,
    title: '스터디 모집',
    content: 'React 스터디 참여하실 분 구합니다.',
    category: '스터디',
    author: { userId: 'hwang', name: '황희' },
    tags: ['React', '스터디'],
    viewCount: 160,
    likeCount: 14,
    commentCount: 5,
    isAnonymous: false,
    createdAt: '2025-08-18T10:30:00.000Z', // 2025년 8월 18일 오전 10시 30분
  },
  {
    id: 15,
    title: '스터디 모집',
    content: 'React 스터디 참여하실 분 구합니다.',
    category: '스터디',
    author: { userId: 'hwang', name: '황희' },
    tags: ['React', '스터디'],
    viewCount: 165,
    likeCount: 15,
    commentCount: 4,
    isAnonymous: false,
    createdAt: '2025-08-17T15:45:00.000Z', // 2025년 8월 17일 오후 3시 45분
  },
]

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
    <div className="bg-white h-screen">
      <header
        id="topNavigator"
        className="flex justify-between pl-5 pr-[0.9375rem] py-3.5 items-center bg-white sticky top-0 z-1"
      >
        <div className="text-h3-bold text-black">커뮤니티</div>
        <button>
          <BellIcon className="size-8 fill-black" />
        </button>
      </header>

      <div id="searchBar" className="flex p-[1.125rem] items-center">
        <div className="flex w-full px-2 py-3 justify-between items-center  rounded-[0.375rem] border-[1px] border-gray-400 bg-white gap-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            className="border-none outline-none bg-transparent w-full"
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
          className="flex py-3 justify-center items-center bg-white text-c1-regular text-gray-500 "
        >
          {posts.length < dummyCommunityPosts.length ? 'Loading...' : '마지막 게시글입니다.'}
        </div>
      </div>
    </div>
  )
}

export default Community
