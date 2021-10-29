import React from 'react';

const Skeleton = (props) => (
  <article className="border-b border-gray-border animate-pulse">
    {/* header */}
    <div className="flex justify-between p-4">
      <div className="flex">
        <div className="w-9 h-9 bg-gray-border rounded-full" />
        <div className="pl-2">
          <div className="w-16 h-3 bg-gray-border rounded"></div>
          <div className="w-7 h-3 mt-1 bg-gray-border rounded"></div>
        </div>
      </div>
    </div>
    {/* image */}
    <div className="w-full h-vw  bg-gray-border rounded max-h-480" />

    {/* related item - hidden 처리*/}
    <div className="flex p-4 border-b border-gray-border hidden">
      <div className="w-16 h-16 bg-gray-border rounded-lg" />
      <div className="ml-2">
        <div className="w-36 h-4 pr-2 bg-gray-border rounded"></div>
        <div className="mt-1 justify-center w-12 h-4 pr-2 bg-gray-border rounded"></div>
      </div>
    </div>

    {/* buttons */}
    <div className="flex items-center justify-between mt-3 px-4 pb-4">
      <div className="flex gap-4">
        <div className="pr-1 w-8 h-8 bg-gray-border rounded" />

        {/* comments */}
        <div className="pr-1 w-8 h-8 bg-gray-border rounded" />
      </div>
      <div className="flex">
        <div className="pr-1 w-6 h-6 bg-gray-border rounded" />
      </div>
    </div>
  </article>
);

export default Skeleton;
