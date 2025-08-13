import { ReactElement } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): ReactElement {
  return (
    <div className="h-dvh overflow-y-scroll max-w-lg p-5 mx-auto my-2 border border-gray-300">
      {children}
    </div>
  )
}
