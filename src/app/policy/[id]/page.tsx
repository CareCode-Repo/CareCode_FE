'use client'
import { ReactElement, use } from 'react'
import Button from '@/components/common/Button'
import Chip from '@/components/common/Chip'
import Layout from '@/components/common/Layout'
import Separator from '@/components/common/Separator'
import { useGetPolicyById } from '@/queries/policy'
import { getChipColor, determinePolicyType, formatAge, formatSupportAmount } from '@/types/policy'

const PolicyDetailPage = ({ params }: { params: Promise<{ id: string }> }): ReactElement => {
  const { id } = use(params)
  const policyId = parseInt(id, 10)
  const { data: policy, isLoading, error } = useGetPolicyById(policyId)

  if (isLoading) {
    return (
      <Layout hasBackButton hasTopNav title="정책 상세">
        <div className="flex grow items-center justify-center">
          <span className="text-b1-regular text-gray-500">로딩 중...</span>
        </div>
      </Layout>
    )
  }

  if (error || !policy) {
    return (
      <Layout hasBackButton hasTopNav title="정책 상세">
        <div className="flex grow items-center justify-center">
          <span className="text-b1-regular text-gray-500">정책을 찾을 수 없습니다.</span>
        </div>
      </Layout>
    )
  }

  const policyType = determinePolicyType(policy.applicationPeriod)
  const tags = [policy.category]
  return (
    <Layout hasBackButton hasTopNav title="정책 상세">
      <div className="flex grow flex-col overflow-y-scroll">
        <div className="flex flex-col gap-5 p-6">
          <Chip shape="square" size="md" className="w-fit" color={getChipColor(policyType)}>
            {policyType}
          </Chip>
          <div className="flex gap-3">
            {tags?.map((tag) => (
              <span key={tag} className="text-b1-medium text-gray-700">
                {'# ' + tag}
              </span>
            ))}
          </div>
          <h2 className="text-h3-bold text-black">{policy.title}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3.5">
              <span className="text-b1-regular text-gray-700">지역</span>
              <span className="text-b1-medium text-black">{policy.location}</span>
            </div>
            <div className="flex gap-3.5">
              <span className="text-b1-regular text-gray-700">연령</span>
              <span className="text-b1-medium text-black">
                {formatAge(policy.minAge, policy.maxAge)}
              </span>
            </div>
            <div className="flex gap-3.5">
              <span className="text-b1-regular text-gray-700">지원금액</span>
              <span className="text-b1-medium text-black">
                {formatSupportAmount(policy.supportAmount)}
              </span>
            </div>
            <div className="flex gap-3.5">
              <span className="text-b1-regular text-gray-700">신청기간</span>
              <span className="text-b1-medium text-black">
                {policy.applicationPeriod || '상시 신청 가능'}
              </span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 p-7.5">
          <span className="text-b1-semibold text-gray-800">지원 내용 상세</span>
          <p>{policy.description}</p>
        </div>
      </div>

      <div className="p-6">
        <Button
          color="green"
          onClick={() => policy.websiteUrl && window.open(policy.websiteUrl, '_blank')}
        >
          신청하기
        </Button>
      </div>
    </Layout>
  )
}

export default PolicyDetailPage
