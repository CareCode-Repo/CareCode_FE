import clsx from 'clsx'
import { ComponentType, ReactElement, SVGProps } from 'react'

interface PostStatProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  count: number
  className?: string
}

const PostStat = ({ icon: Icon, count, className }: PostStatProps): ReactElement => {
  return (
    <div className={clsx('flex items-center gap-1 text-c1-regular', className)}>
      <Icon className="size-4.5" />
      {count}
    </div>
  )
}

export default PostStat
