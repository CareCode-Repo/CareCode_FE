import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { RefObject, useEffect, useRef } from 'react'

import useIntersectionObserver from '@/hooks/useIntersectionObserver'

const ioOptions = {
  threshold: 0,
  delay: 0,
}

type UseInfiniteScrollReturn<TData, TError> = UseInfiniteQueryResult<TData, TError> & {
  loadMoreRef: RefObject<HTMLDivElement>
  isIntersecting: boolean | undefined
  observerRef: RefObject<IntersectionObserver | null>
}

const useInfiniteScroll = <TData, TError>(
  query: UseInfiniteQueryResult<TData, TError>,
): UseInfiniteScrollReturn<TData, TError> => {
  const { fetchNextPage, hasNextPage } = query
  const loadMoreRef = useRef<HTMLDivElement>(null!)
  const {
    entries: [entry],
    observerRef,
  } = useIntersectionObserver(loadMoreRef as RefObject<HTMLElement>, ioOptions)

  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, fetchNextPage])

  return {
    loadMoreRef,
    isIntersecting,
    observerRef,
    ...query,
  }
}

export default useInfiniteScroll
