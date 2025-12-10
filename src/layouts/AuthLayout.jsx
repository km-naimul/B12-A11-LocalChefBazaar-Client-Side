// src/layouts/AuthLayout.jsx
import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import { Outlet } from "react-router";
import img from "../assets/food-courier-delivery-service-flat-illustration_106954-2544-removebg-preview-removebg-preview.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col  max-w-7xl mx-auto">
      {/* Navbar */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto ">
          <Navbar />
        </div>
      </div>

      {/* Main split area */}
      <div className="flex-1 flex items-stretch">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-lg mt-6 mb-6 bg-white">
          {/* Left panel - image & marketing text */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-400 via-red-300 to-orange-200 relative items-center justify-center p-8">
            <div className="absolute inset-0 bg-black/5" />
            <div className="relative space-y-5 text-white text-center">
              <img
                src={img}
                alt="Food Delivery"
                className="w-[420px] mx-auto drop-shadow-2xl"
              />
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Local<span className="text-yellow-200">ChefBazaar</span>
                </h2>
                <p className="text-sm text-red-50">
                  Connecting you with passionate home cooks in your city.  
                  Discover new flavors, healthy options and comfort food – all from real kitchens.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel - Outlet */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#fcf1f1] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
