import { Policy } from './apis/policy'

export type PolicyType = '상시접수' | '매월' | '선착순'
//  | 'D-Day'

// 정책 타입에 따른 칩 색상 결정
export const getChipColor = (type: PolicyType | 'D-Day'): 'green' | 'purple' | 'blue' | 'red' => {
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

export type PolicyCardProps = {
  id: number
  tags: string[]
  title: string
  description: string
  region: string
  targetAge: string
  applicationPeriod: string
  className?: string
  onClick?: () => void
} & ({ type: 'D-Day'; dday: number } | { type: Exclude<PolicyType, 'D-Day'>; dday?: never })

// 연령을 월 단위에서 사용자 친화적 형태로 변환
export const formatAge = (minAge: number, maxAge: number): string => {
  if (minAge === 0) return `신생아~만 ${Math.floor(maxAge / 12)}세`
  if (maxAge >= 216) return `만 ${Math.floor(minAge / 12)}세 이상`
  return `만 ${Math.floor(minAge / 12)}세~만 ${Math.floor(maxAge / 12)}세`
}

// 지원금액을 사용자 친화적 형태로 변환
export const formatSupportAmount = (amount?: number | null): string => {
  if (!amount) return '문의'
  if (amount >= 100000000) return `${Math.floor(amount / 100000000)}억원`
  if (amount >= 10000) return `${Math.floor(amount / 10000)}만원`
  return `${amount.toLocaleString()}원`
}

// 정책 타입 결정
export const determinePolicyType = (applicationPeriod?: string): PolicyType => {
  const period = applicationPeriod?.toLowerCase() || ''
  if (period.includes('상시')) return '상시접수'
  if (period.includes('매월') || period.includes('월별')) return '매월'
  if (period.includes('선착순')) return '선착순'
  return '상시접수' // 기본값
}

// API 데이터를 PolicyCard props로 변환
export const convertPolicyToCardProps = (
  policy: Policy,
): Omit<PolicyCardProps, 'dday'> & { type: Exclude<PolicyType, 'D-Day'> } => {
  return {
    id: policy.id,
    type: determinePolicyType(policy.applicationPeriod),
    tags: [policy.category],
    title: policy.title,
    description: policy.description,
    region: policy.location,
    targetAge: formatAge(policy.minAge, policy.maxAge),
    applicationPeriod: policy.applicationPeriod || '상시 신청 가능',
  }
}
