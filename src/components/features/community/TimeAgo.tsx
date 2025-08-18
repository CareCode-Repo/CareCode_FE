'use client'

import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useEffect, useState } from 'react'

interface TimeAgoProps {
  date: string
}

const TimeAgo = ({ date }: TimeAgoProps) => {
  const [timeAgo, setTimeAgo] = useState('') // 초기값 비워두기

  useEffect(() => {
    const update = () => {
      setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko }))
    }
    update()
    const interval = setInterval(update, 60000) // 1분마다 업데이트
    return () => clearInterval(interval)
  }, [date])

  return <span>{timeAgo}</span>
}

export default TimeAgo
