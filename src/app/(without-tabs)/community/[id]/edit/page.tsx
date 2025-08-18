'use client'
import { useRouter } from 'next/navigation'
import { JSX, useState } from 'react'
import { postDetailDummy } from '../dataDummy'
import Separator from '@/components/common/Separator'
import BackButton from '@/components/features/community/BackButton'
import { Post } from '@/types/apis/community'

const CommunityPostEdit = (): JSX.Element => {
  const [title, setTitle] = useState<Post['title']>(postDetailDummy.title)
  const [content, setContent] = useState<Post['content']>(postDetailDummy.content)
  const router = useRouter()

  const handleEditButton = () => {
    console.log('Edit Confirm Button Pressed')
    router.back()
  }
  return (
    <div className="relative flex h-screen flex-col bg-white text-black">
      <header
        id="topNavigator"
        className="sticky top-0 z-1 flex items-center justify-start gap-2.5 bg-white py-3.5 pr-[0.9375rem] pl-5"
      >
        <BackButton />
        <div className="text-h3-bold">게시글 수정</div>
      </header>

      <div className="flex h-full flex-col items-start gap-[1.125rem] p-6">
        <input
          placeholder={'제목을 입력해주세요'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-t1-semibold w-full outline-none"
        />
        <Separator className="w-full shrink-0" />
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-b1-regular scrollbar-hide w-full flex-1 resize-none rounded-lg border border-gray-500 p-3 !outline-none focus:border-gray-800"
        />
        <button
          onClick={handleEditButton}
          className="text-t1-semibold flex w-full items-center justify-center rounded-xl bg-green-600 py-[1.125rem] text-center text-gray-100"
        >
          수정하기
        </button>
      </div>
    </div>
  )
}

export default CommunityPostEdit
