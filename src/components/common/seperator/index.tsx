import clsx from 'clsx'
import { ReactElement } from 'react'

interface SeperatorProps {
  className?: string
}

const Seperator = ({ className }: SeperatorProps): ReactElement => {
  return <div className={clsx('h-px bg-gray-300', className)} />
}

export default Seperator
