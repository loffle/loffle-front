import React from 'react';

const Skeleton = (props) => (
  <>
    <div className="bg-gray-border relative animate-pulse">
      <div
        className={'px-5 py-1 m-5 bg-white absolute z-20 rounded-full w-20 h-8'}
      ></div>
      <div className="w-full h-vw  bg-gray-border rounded max-h-480" />
      <div
        className={
          'text-6xl font-medium w-full absolute z-20 -bottom-8 text-gray-light'
        }
      >
        <div className="flex items-center justify-center">
          <span>00</span>
          <span className="mb-2 mx-1">{':'}</span>
          <span>00</span>
          <span className="mb-2  mx-1">{':'}</span>
          <span>00</span>
        </div>
      </div>
    </div>

    <div className="mt-12 px-4 pb-2 flex flex-col justify-center w-full">
      <div className="w-36 h-6 bg-gray-border rounded mx-auto"></div>

      <div className="w-12 h-4 bg-gray-border rounded mt-2 mx-auto"></div>
      <div className="w-44 h-6 bg-gray-border rounded mt-4 mx-auto"></div>

      {/* apply raffle */}
      <div className="w-80 h-12 bg-gray-border rounded-lg my-6 mx-auto"></div>
    </div>
  </>
);

export default Skeleton;
