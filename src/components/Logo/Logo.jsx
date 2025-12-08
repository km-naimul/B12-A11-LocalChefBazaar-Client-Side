import React from 'react';
import logo from '../../assets/Image___12_46_33_PM-removebg-preview.png'

const Logo = () => {
    return (

    <div> 
        <div className="flex items-end justify-center">
    <img 
        src={logo} 
        alt="LocalChefBazaar Logo" 
        className="w-10 h-12 object-contain mx-auto" 
    />
    <h3 className="text-2xl font-bold -ms-1">
        <span className="text-red-600">Local</span>
        <span className="text-green-700">ChefBazaar</span>
    </h3>
</div>
<h1 className='text-[11px] text-gray-600 font-bold justify-center items-center text-center'>
     Connecting People Through Home Cooking
</h1>

    </div>
        


    );
};

export default Logo;