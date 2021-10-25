import React from 'react';

const Skeleton = (props) => (
  <div className="h-30 p-5 border-b border-gray-border">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1">
        <div className="h-6 bg-gray-border mb-1 rounded w-1/4"></div>
        <div className="mb-1 h-5 bg-gray-border rounded w-1/4"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-border rounded w-1/2"></div>
          <div className="h-4 bg-gray-border rounded w-1/6"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
