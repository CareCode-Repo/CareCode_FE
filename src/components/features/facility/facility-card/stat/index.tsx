import { ReactElement } from 'react'

interface StatProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  value: string | number
  className?: string
}

const Stat = ({ icon: Icon, value, className = '' }: StatProps): ReactElement => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Icon className="w-3 h-3 stroke-gray-700" />
      <span className="text-c1-regular text-black">{value}</span>
    </div>
  )
}

export default Stat
