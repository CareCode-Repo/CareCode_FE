import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface MainSectionProps {
  title: string
  className?: string
  children?: ReactNode
}

const MainSection = ({ title, className, children }: MainSectionProps): ReactElement => {
  return (
    <div className={clsx('flex flex-col gap-4.5 border border-gray-100 rounded-lg', className)}>
      <h1 className="px-4 pt-4 text-t2-semibold text-black">{title}</h1>
      {children}
    </div>
  )
}

export default MainSection
