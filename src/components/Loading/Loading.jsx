// src/components/Loading.jsx
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-48">
        <Lottie animationData={loadingAnimation} loop />
      </div>
      <p className="mt-4 text-gray-500 text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
