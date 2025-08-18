'use client'

import React, { useState } from 'react'
import TabNavigation from '../molecule/TabNavigation'
import StoreHeader from './StoreHeader'

const RightContent: React.FC = () => {
  const tabs = ['정책정보', '시설정보', '홈', '마이페이지']
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="flex h-screen w-2/3 items-center justify-center bg-gray-100">
      <div className="flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        <StoreHeader />
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {/* 제목이 여기에 들어갈 예정 */}
            </h2>
            <p className="text-gray-600">{/* 부제목이 여기에 들어갈 예정 */}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightContent
