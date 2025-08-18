import { ReactElement, ReactNode } from 'react'

const WithoutTabsLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="flex flex-col h-dvh">
      <div className="grow overflow-y-scroll scrollbar-hide">{children}</div>
    </div>
  )
}

export default WithoutTabsLayout
