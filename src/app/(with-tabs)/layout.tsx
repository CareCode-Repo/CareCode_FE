import { ReactElement, ReactNode } from 'react'
import TabBar from '@/components/common/tab-bar'

const WithTabsLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="flex flex-col h-dvh">
      <div className="grow overflow-y-scroll scrollbar-hide">{children}</div>
      <TabBar />
    </div>
  )
}

export default WithTabsLayout
