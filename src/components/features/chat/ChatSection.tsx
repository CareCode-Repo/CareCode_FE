'use client'

import { ReactElement, useEffect, useRef } from 'react'
import RightArrowIcon from '@/assets/icons/arrow_with_circle_small.svg'
import CharacterIcon from '@/assets/icons/characters/hi.svg'

const ChatSection = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleClick = () => console.log('Chat section clicked')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.beginPath()
    ctx.moveTo(0, canvas.height * 0.85)

    ctx.bezierCurveTo(
      canvas.width * 0.2,
      canvas.height * 0.55,
      canvas.width * 0.3,
      canvas.height * 0.58,
      canvas.width * 0.4,
      canvas.height * 0.6,
    )

    ctx.bezierCurveTo(
      canvas.width * 0.5,
      canvas.height * 0.75,
      canvas.width * 0.7,
      canvas.height * 0.82,
      canvas.width * 0.8,
      canvas.height * 0.83,
    )

    ctx.lineTo(canvas.width, canvas.height * 0.83)

    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()

    ctx.fillStyle = '#B5E89E' // green-200
    ctx.fill()
  }, [])

  return (
    <div
      className="flex flex-col border border-gray-100 rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-3.5 flex gap-1.5 items-center">
        <h1 className="text-t2-semibold">상담하러 가기</h1>
        <RightArrowIcon className="size-4.5 fill-black" />
      </div>
      <div className="h-44 bg-green-100 relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <CharacterIcon className="absolute bottom-0 top-10 left-4.5 w-56 z-10" />
      </div>
    </div>
  )
}

export default ChatSection
