// LogoBadge.jsx (বা চাইলে আবারও Logo.jsx এ রাখবি)
import React from "react";
import logo from "../../assets/Image___12_46_33_PM-removebg-preview.png";

const LogoBadge = () => {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-2  border-red-50">
      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-500 to-green-500 p-[2px]">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <img
            src={logo}
            alt="LocalChefBazaar Logo"
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
      <div className="leading-tight">
        <h3 className="text-xl font-extrabold tracking-tight">
          <span className="text-red-600">Local</span>
          <span className="text-green-700">ChefBazaar</span>
        </h3>
        <p className="text-[11px] text-gray-500 font-medium">
          Connecting People Through Home Cooking
        </p>
      </div>
    </div>
  );
};

export default LogoBadge;
