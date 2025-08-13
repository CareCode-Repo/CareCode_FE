import { ReactElement } from 'react'

interface DetailItemProps {
  title: string
  content: string
}

const DetailItem = ({ title, content }: DetailItemProps): ReactElement => {
  return (
    <div className="flex items-start gap-2 text-c1-regular">
      <dt className="text-gray-700 whitespace-nowrap flex-shrink-0">{title}</dt>
      <dd className="text-black truncate min-w-0">{content}</dd>
    </div>
  )
}

export default DetailItem
