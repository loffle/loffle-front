import React from "react";

const Loading = (props) => (
  <div className="min-h-screen flex items-center justify-center flex-col">
    <h1 className="text-3xl">Loading...</h1>
    <div
      className="border-4 border-gray-light rounded-full w-12 h-12 animate-spin my-5 mx-auto"
      style={{ borderTop: `5px solid #353535` }}
    ></div>
  </div>
);

export default Loading;
