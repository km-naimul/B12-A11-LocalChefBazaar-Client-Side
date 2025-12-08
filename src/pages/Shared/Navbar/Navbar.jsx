import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink } from 'react-router';

const Navbar = () => {
    const links = <> 
         <li className='font-semibold text-red-600 text-[20px]'><NavLink to=""> Home </NavLink></li>
         <li className='font-semibold text-red-600 text-[20px]'><NavLink to=""> Meals </NavLink></li>
    </>
    return (
        <div className="navbar shadow rounded">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className=""><Logo> </Logo></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold w-18 h-8">Login</a>
    <a className="btn bg-red-600 text-white m-2 hover:bg-red-500 border-round font-semibold w-18 h-8">Register</a>
  </div>
</div>
    );
};

export default Navbar;