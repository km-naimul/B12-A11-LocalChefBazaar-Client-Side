import React from "react";
import { FaMoneyCheck, FaUserCheck, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdManageAccounts, MdOutlineRateReview } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { BsBagCheckFill } from "react-icons/bs";
import { GiEternalLove, GiFoodTruck, GiMeal } from "react-icons/gi";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUsersGear } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import logoImg from "../assets/Image___12_46_33_PM-removebg-preview.png"

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar bg-base-300">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost"
          >
            ☰
          </label>
          <div className="px-4 font-semibold">
            Local Chef-Bazaar Dashboard
          </div>
        </nav>

        <Outlet />
      </div>
    

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <ul className="menu p-4 w-64 min-h-full bg-base-200 space-y-1">
          {/* ================= COMMON ================= */}
          <li>
            <Link to="/"> 
            
            
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-500 to-green-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <img
                        src={logoImg}
                        alt="LocalChefBazaar Logo"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  
                  <div>
                      <h3 className="text-xl font-extrabold tracking-tight">
          <span className="text-red-600">Local</span>
          <span className="text-green-700">ChefBazaar</span>
        </h3>
                    </div>
                   </Link>
          </li>


          <li>
            <Link to="/dashboard">🏠 Homepage</Link>
          </li>

          <li>
            <NavLink to="/dashboard/my-profile">
              <ImProfile /> My Profile
            </NavLink>
          </li>

          {/* ================= USER ================= */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/my-orders">
                  <BsBagCheckFill /> My Orders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaMoneyCheck /> Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-review">
                  <MdOutlineRateReview /> My Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/favorite-meal">
                  <GiEternalLove /> Favorite Meal
                </NavLink>
              </li>
            </>
          )}

          {/* ================= CHEF ================= */}
          {role === "chef" && (
            <>
              <li>
                <NavLink to="/dashboard/create-meal">
                  <GiFoodTruck /> Create Meal
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-meals">
                  <GiMeal /> My Meals
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/order-request">
                  <CiSquareQuestion /> Order Requests
                </NavLink>
              </li>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUserCheck /> Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-requests">
                  <FaUsersGear /> Manage Requests
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/platform-statistics">
                  <FcStatistics /> Platform Statistics
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
