import React from 'react';

const StoreHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="w-6 h-6 flex flex-col justify-center items-center cursor-pointer">
        <div className="w-4 h-0.5 bg-gray-600 mb-1"></div>
        <div className="w-4 h-0.5 bg-gray-600 mb-1"></div>
        <div className="w-4 h-0.5 bg-gray-600"></div>
      </div>
      
      <h1 className="text-lg font-semibold text-gray-800">맘편한</h1>
      
      <div className="w-6 h-6 cursor-pointer">
      </div>
    </div>
  );
};

export default StoreHeader; 