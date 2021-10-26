import React from 'react';

const Skeleton = (props) => (
  <>
    <div className="h-30 px-5 py-3 border-b border-gray-border">
      <div className="flex justify-between">
        <div className="text-sm">
          <div className="mb-1 w-8 h-4 bg-gray-border rounded" />
          <div className="mb-1 w-14 h-4 bg-gray-border rounded" />
        </div>
        <div className="pr-1 mt-2 w-4 h-4 bg-gray-border rounded" />
      </div>
    </div>
    <div className="h-30 px-5 py-3 border-b border-gray-border">
      <div className="flex justify-between">
        <div className="text-sm">
          <div className="mb-1 w-8 h-4 bg-gray-border rounded" />
          <div className="mb-1 w-14 h-4 bg-gray-border rounded" />
        </div>
        <div className="pr-1 mt-2 w-4 h-4 bg-gray-border rounded" />
      </div>
    </div>
    <div className="h-30 px-5 py-3 border-b border-gray-border">
      <div className="flex justify-between">
        <div className="text-sm">
          <div className="mb-1 w-8 h-4 bg-gray-border rounded" />
          <div className="mb-1 w-14 h-4 bg-gray-border rounded" />
        </div>
        <div className="pr-1 mt-2 w-4 h-4 bg-gray-border rounded" />
      </div>
    </div>
  </>
);

export default Skeleton;
