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
      className="inline-flex pl-[1.13rem] pr-[0.94rem] py-3 justify-center items-center gap-1 rounded-3xl border-green-600 border bg-gray-800 absolute bottom-[5.75rem] right-[1.125rem] z-3"
    >
      <div className="text-b1-medium text-gray-50">글 쓰기</div>
      <PencilIcon className="size-4 fill-gray-50" />
    </button>
  )
}

export default NewPostFAB
