import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {
    const { userName ,user_photoURL,reviews , date} =review;
    return (
         <div className="max-w-md mx-auto bg-white shadow rounded-2xl p-6 border border-gray-100 ">
      
      {/* Quote Icon */}
      <FaQuoteLeft className="text-3xl text-teal-400 mb-4" />

      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed">
        {reviews}
      </p>

      {/* Divider */}
      <div className="my-4 border-b border-dashed border-teal-300"></div>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-teal-700 rounded-full">
             <img src={user_photoURL} alt="" /></div>

        <div>
          <h4 className="font-semibold text-teal-800 text-lg">
            {userName}
          </h4>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;