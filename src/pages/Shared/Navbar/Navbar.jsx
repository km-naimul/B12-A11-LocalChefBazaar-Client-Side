import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  const links = (
    <>
      <li className="font-semibold text-red-600 text-[18px]">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold text-red-600 text-[18px]">
        <NavLink to="/meals">Meals</NavLink>
      </li>
      {user && (
        <li className="font-semibold text-red-600 text-[18px]">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar shadow rounded px-2">
      
      <div className="navbar-start">
        
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

         
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-3 shadow z-50"
          >
            {links}

            <div className="border-t my-2"></div>

            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2 px-2">
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{user.displayName}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

       
        <Logo />
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      
      <div className="navbar-end hidden lg:flex gap-3">
        {!user ? (
          <>
            <Link
              className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold h-8"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold h-8"
              to="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
              <img
                src={user.photoURL}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-red-400 object-cover"
              />
            </div>

            <button
              onClick={handleLogOut}
              className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold h-8"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
