import React from 'react'

const StoreHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-4">
      <div className="flex h-6 w-6 cursor-pointer flex-col items-center justify-center">
        <div className="mb-1 h-0.5 w-4 bg-gray-600"></div>
        <div className="mb-1 h-0.5 w-4 bg-gray-600"></div>
        <div className="h-0.5 w-4 bg-gray-600"></div>
      </div>

      <h1 className="text-lg font-semibold text-gray-800">맘편한</h1>

      <div className="h-6 w-6 cursor-pointer"></div>
    </div>
  )
}

export default StoreHeader
