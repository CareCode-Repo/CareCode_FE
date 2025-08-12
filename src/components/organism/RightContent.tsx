"use client";

import React, { useState } from 'react';
import StoreHeader from './StoreHeader';
import TabNavigation from '../molecule/TabNavigation';

const RightContent: React.FC = () => {
  const tabs = ['정책정보', '시설정보', '홈', '마이페이지'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="w-2/3 bg-gray-100 h-screen flex justify-center items-center">
      <div className="w-full max-w-md h-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <StoreHeader />
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {/* 제목이 여기에 들어갈 예정 */}
            </h2>
            <p className="text-gray-600">
              {/* 부제목이 여기에 들어갈 예정 */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;