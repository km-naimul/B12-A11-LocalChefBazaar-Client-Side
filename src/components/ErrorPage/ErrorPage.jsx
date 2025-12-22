import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/Page Not Found 404.json"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <h1 className="text-4xl font-bold text-red-500 mt-4">
        Oops! Page Not Found
      </h1>

      <p className="text-gray-600 text-center mt-2">
        The page you are looking for doesn't exist or something went wrong.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        ⬅ Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
