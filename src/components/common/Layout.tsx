import clsx from 'clsx'
import { ReactElement } from 'react'
import TopNavBar from './top-navbar'
import { LayoutProps } from '@/types/layout'

export const Layout = (props: LayoutProps): ReactElement => {
  const { hasTopNav, children, contentClassName } = props

  return (
    <div className="flex flex-col h-full">
      {hasTopNav && <TopNavBar {...props} />}

      <main className={clsx('grow overflow-y-scroll flex flex-col bg-gray-50', contentClassName)}>
        {children}
      </main>
    </div>
  )
}

export default Layout
