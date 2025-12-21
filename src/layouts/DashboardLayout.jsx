import React from "react";
import { FaMoneyCheck, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";

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
            <Link to="/">🏠 Homepage</Link>
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
                  <IoFastFoodSharp /> My Orders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaMoneyCheck /> Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-review">
                  <FaMoneyCheck /> My Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/favorite-meal">
                  <FaMoneyCheck /> Favorite Meal
                </NavLink>
              </li>
            </>
          )}

          {/* ================= CHEF ================= */}
          {role === "chef" && (
            <>
              <li>
                <NavLink to="/dashboard/create-meal">
                  <IoFastFoodSharp /> Create Meal
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-meals">
                  <IoFastFoodSharp /> My Meals
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/order-request">
                  <IoFastFoodSharp /> Order Requests
                </NavLink>
              </li>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-requests">
                  <MdManageAccounts /> Manage Requests
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/platform-statistics">
                  <FaMoneyCheck /> Platform Statistics
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
