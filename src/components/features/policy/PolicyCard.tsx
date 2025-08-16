import clsx from 'clsx'
import { ReactElement } from 'react'

import Chip from '@/components/common/Chip'
import DescriptionItem from '@/components/common/DescriptionItem'
import Spacer from '@/components/common/Spacer'
import Tag from '@/components/common/Tag'
import { PolicyType } from '@/types/policy'

type PolicyCardProps = {
  tags: string[]
  title: string
  description: string
  region: string
  targetAge: string
  applicationPeriod: string
  className?: string
  onClick?: () => void
} & ({ type: 'D-Day'; dday: number } | { type: Exclude<PolicyType, 'D-Day'>; dday?: never })

const PolicyCard = ({
  type,
  tags,
  title,
  description,
  region,
  targetAge,
  applicationPeriod,
  dday,
  className,
  onClick,
}: PolicyCardProps): ReactElement => {
  const getChipColor = () => {
    switch (type) {
      case '상시접수':
        return 'purple'
      case '매월':
        return 'blue'
      case 'D-Day':
        return 'green'
      case '선착순':
        return 'red'
    }
  }
  return (
    <div
      role="button"
      className={clsx(
        'w-[18rem] flex flex-col pl-3.5 pr-3.5 pt-3.5 pb-[1.125rem] bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2.5">
        <Chip color={getChipColor()}>{(dday && `D-${dday}`) || type}</Chip>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <Spacer className="h-2.5" />
      <h3 className="text-b1-medium text-black">{title}</h3>
      <p className="text-c1-regular text-gray-700 truncate">{description}</p>
      <Spacer className="h-3.5" />
      <dl className="flex flex-col gap-0.5">
        <DescriptionItem title="지역" content={region} />
        <DescriptionItem title="연령" content={targetAge} />
        <DescriptionItem title="신청기간" content={applicationPeriod} />
      </dl>
    </div>
  )
}

export default PolicyCard
