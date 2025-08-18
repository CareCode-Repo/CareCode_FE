import { useRouter } from 'next/navigation'
import { JSX } from 'react'
import PencilIcon from '@/assets/icons/pencil.svg'

const NewPostFAB = (): JSX.Element => {
  const router = useRouter()
  const onPress = () => {
    router.push('community/write')
  }
  return (
    <button
      onClick={onPress}
      className="fixed right-[1.125rem] bottom-[5.75rem] z-3 inline-flex items-center justify-center gap-1 rounded-3xl border border-green-600 bg-gray-800 py-3 pr-[0.94rem] pl-[1.13rem]"
    >
      <div className="text-b1-medium text-gray-50">글 쓰기</div>
      <PencilIcon className="size-4 fill-gray-50" />
    </button>
  )
}

export default NewPostFAB
