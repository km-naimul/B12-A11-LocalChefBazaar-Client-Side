import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

  const{user, logOut} = useAuth();

  const handleLogOut = () =>{
    logOut()
    .then()
    .catch(error => {
      console.log(error)
    })
  }

    const links = <> 
         <li className='font-semibold text-red-600 text-[20px]'><NavLink to=""> Home </NavLink></li>
         <li className='font-semibold text-red-600 text-[20px]'><NavLink to="/meals"> Meals </NavLink></li>
         <li className='font-semibold text-red-600 text-[20px]'><NavLink to="/create-meal">Create Meal</NavLink></li>

         {
            user && <> 
      <li className='font-semibold text-red-600 text-[20px]'><NavLink to="/dashboard/my-meals">My Meals</NavLink></li>
            </>
         }

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
      {
        user? <a onClick={handleLogOut} className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold w-18 h-8">Logout</a> : <Link className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold w-18 h-8" to="/login"> Login</Link>        
      }

      <Link className="btn btn-outline hover:bg-red-200 text-red-600 font-semibold w-18 h-8 mx-2" to="/register"> Register </Link>
    
  </div>
</div>
    );
};

export default Navbar;