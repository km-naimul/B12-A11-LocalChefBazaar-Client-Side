// src/layouts/AuthLayout.jsx
import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import { Outlet } from "react-router";
import img from "../assets/food-courier-delivery-service-flat-illustration_106954-2544-removebg-preview-removebg-preview.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-lg bg-white my-6">

          {/* Left panel (hidden on small devices) */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-400 via-red-300 to-orange-200 relative items-center justify-center p-8">
            <div className="absolute inset-0 bg-black/5" />
            <div className="relative space-y-5 text-white text-center">
              <img
                src={img}
                alt="Food Delivery"
                className="w-[380px] xl:w-[420px] mx-auto drop-shadow-2xl"
              />

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Local<span className="text-yellow-200">ChefBazaar</span>
                </h2>
                <p className="text-sm text-red-50 leading-relaxed">
                  Connecting you with passionate home cooks in your city.  
                  Discover new flavors, healthy options and comfort food – all from real kitchens.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel (Form area) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md px-4 py-8 sm:px-6">
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
