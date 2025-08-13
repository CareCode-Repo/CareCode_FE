import { ReactElement } from 'react'

interface TagItemProps {
  tag: string
}

const TagItem = ({ tag }: TagItemProps): ReactElement => {
  return <span className="text-c1-regular text-gray-700">{`# ${tag}`}</span>
}

export default TagItem
