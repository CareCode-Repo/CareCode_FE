import { ReactElement, use } from 'react'

const PolicyDetailPage = ({
  params,
}: {
  params: Promise<{ 'policy-id': string }>
}): ReactElement => {
  const { 'policy-id': policyId } = use(params)
  return <div>정책 상세{policyId}</div>
}

export default PolicyDetailPage
