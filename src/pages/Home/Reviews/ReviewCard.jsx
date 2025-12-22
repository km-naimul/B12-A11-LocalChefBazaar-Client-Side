import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const {
    reviewerName,
    reviewerImage,
    comment,
    rating,
    date,
  } = review;

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-2xl p-6 border border-gray-100">
      
    
      <FaQuoteLeft className="text-3xl text-teal-400 mb-4" />

      
      <p className="text-gray-600 leading-relaxed">
        {comment}
      </p>

   
      <p className="mt-2 text-sm text-yellow-600">
        ⭐ {rating}
      </p>

      <div className="my-4 border-b border-dashed border-teal-300"></div>

   
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-700">
          <img
            src={reviewerImage}
            alt={reviewerName}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="font-semibold text-teal-800 text-lg">
            {reviewerName}
          </h4>
          <p className="text-gray-500 text-sm">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
