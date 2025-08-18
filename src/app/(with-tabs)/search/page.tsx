'use client'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import BellIcon from '@/assets/icons/bell.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Chip from '@/components/common/Chip'
import Layout from '@/components/common/Layout'
import Spacer from '@/components/common/Spacer'
import Input from '@/components/common/input'
import { useRecentSearches } from '@/hooks/useRecentSearches'
import { useSearchPolicy } from '@/hooks/useSearchPolicy'

const Search = (): ReactElement => {
  const { recentSearches, removeSearch, clearAllSearches } = useRecentSearches()
  const router = useRouter()
  const { inputValue, handleInputChange, performSearch } = useSearchPolicy()
  const handleNotificationClick = () => router.push('/notification')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.length === 0) return
    performSearch(inputValue)
  }

  return (
    <Layout
      hasTopNav
      title="육아 정보"
      actionButtons={[{ icon: BellIcon, onClick: handleNotificationClick }]}
      contentClassName="overflow-y-scroll py-6 px-4.5"
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
      {recentSearches.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-b1-semibold text-gray-800">최근 검색어</span>
            <button
              className="text-b1-regular text-gray-700 hover:text-gray-800"
              onClick={clearAllSearches}
            >
              전체삭제
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-scroll [&>*]:shrink-0 scrollbar-hide">
            {recentSearches.map((recentSearchValue) => (
              <Chip
                key={recentSearchValue}
                size="md"
                color="transparent"
                shape="round"
                deletable
                onDelete={() => removeSearch(recentSearchValue)}
                onClick={() => performSearch(recentSearchValue)}
              >
                {recentSearchValue}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Search
