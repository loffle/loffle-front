import React from 'react';

const Skeleton = (props) => (
  <>
    <div className="h-30 m-5 rounded-lg animate-pulse">
      <div className="flex p-4 ">
        <div className="w-7 h-7 rounded-full bg-gray-border"></div>
        <div className="ml-2 w-11/12">
          <div className="flex justify-between">
            <div className="w-14 h-4 mt-1 bg-gray-border rounded" />
          </div>
          <div className="flex justify-between">
            <div className="w-20 h-4 mt-1 bg-gray-border rounded" />
            <div className="w-14 h-4 mt-1 bg-gray-border rounded" />
          </div>
          <div className="w-14 h-4 mt-1 bg-gray-border rounded" />
          <div className="w-28 h-4 mt-1 bg-gray-border rounded" />
          <div className="flex justify-between">
            <div className="w-18 h-4 mt-1 bg-gray-border rounded" />
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-gray-border rounded-b-lg"></div>
    </div>
    <div className="h-30 m-5 rounded-lg animate-pulse">
      <div className="flex p-4 ">
        <div className="w-7 h-7 rounded-full bg-gray-border"></div>
        <div className="ml-2 w-11/12">
          <div className="flex justify-between">
            <div className="w-14 h-4 mt-1 bg-gray-border rounded" />
          </div>
          <div className="flex justify-between">
            <div className="w-20 h-4 mt-1 bg-gray-border rounded" />
            <div className="w-14 h-4 mt-1 bg-gray-border rounded" />
          </div>
          <div className="w-14 h-4 mt-1 bg-gray-border rounded" />
          <div className="w-28 h-4 mt-1 bg-gray-border rounded" />
          <div className="flex justify-between">
            <div className="w-18 h-4 mt-1 bg-gray-border rounded" />
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-gray-border rounded-b-lg"></div>
    </div>
  </>
);

export default Skeleton;
