import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRecentSearches } from './useRecentSearches'

interface UseSearchPolicyReturn {
  inputValue: string
  performSearch: (value: string) => void
  handleInputChange: (value: string) => void
}

export const useSearchPolicy = (initialKeyword: string = ''): UseSearchPolicyReturn => {
  const [inputValue, setInputValue] = useState(initialKeyword)
  const { addSearch } = useRecentSearches()
  const router = useRouter()

  useEffect(() => {
    setInputValue(initialKeyword)
  }, [initialKeyword])

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
  }, [])
  const performSearch = useCallback(
    (value: string) => {
      setInputValue(value)
      addSearch(value)
      router.push(`/search/policy?keyword=${encodeURIComponent(value)}`)
    },
    [addSearch, router],
  )

  return {
    inputValue,
    performSearch,
    handleInputChange,
  }
}
