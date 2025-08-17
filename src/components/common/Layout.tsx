import clsx from 'clsx'
import { ReactElement } from 'react'
import TopNavBar from './top-navbar'
import { LayoutProps } from '@/types/layout'

export const Layout = (props: LayoutProps): ReactElement => {
  const { hasTopNav, children, contentClassName } = props

  return (
    <div className="flex flex-col h-full">
      {hasTopNav && <TopNavBar {...props} />}

      <div className={clsx('grow overflow-y-scroll flex flex-col bg-gray-50', contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export default Layout
