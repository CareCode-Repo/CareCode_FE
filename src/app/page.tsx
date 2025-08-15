import { ReactNode } from 'react'
import PromotionPanel from '@/components/organism/PromotionPanel'
import RightContent from '@/components/organism/RightContent'

export default function Home(): ReactNode {
  return (
    <div className="flex h-screen">
      <PromotionPanel />
      <RightContent />
    </div>
  )
}
