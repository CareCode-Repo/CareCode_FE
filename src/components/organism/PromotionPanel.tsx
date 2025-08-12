import React from 'react';

const PromotionPanel: React.FC = () => {
  return (
    <div className="w-1/3 bg-gray-800 h-screen flex flex-col items-center justify-center p-8">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-2">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <span className="text-white text-2xl font-bold">CareCode</span>
      </div>
      
      {/* 헤드라인 */}
      <h1 className="text-white text-xl text-center mb-8">
        우리 아이 케어를 위한 엄마들의 선택 
      </h1>
      
      {/* QR 코드 */}
      <div className="w-32 h-32 bg-white rounded-lg mb-8 flex items-center justify-center">
        <div className="text-gray-400 text-xs">QR Code</div>
      </div>
      
      {/* 기능 설명 */}
      <div className="space-y-4 text-white text-sm">
        <div className="flex items-start">
          <span className="mr-2">•</span>
          <span>내 아이 건강 정보를 입력한 후, 필요한 케어를 받을 수 있어요</span>
        </div>
        <div className="flex items-start">
          <span className="mr-2">•</span>
          <span>지역별 소아 전문 병원을 확인한 후, 관리, 진료 안내 등을 받을 수 있어요</span>
        </div>
        <div className="flex items-start">
          <span className="mr-2">•</span>
          <span>맘편한에서만 만날 수 있는 우리 아이 정책 정보 제공 서비스</span>
        </div>
      </div>
    </div>
  );
};

export default PromotionPanel; 