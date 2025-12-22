// src/pages/Meals/Meals.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 6;

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: meals = [] } = useQuery({
    queryKey: ["allMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/createMeals");
      return res.data;
    },
  });

  // 🔁 Sort (unchanged logic)
  const sortedMeals = [...meals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(sortedMeals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMeals = sortedMeals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // reset page on sort
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            All <span className="text-red-600">Daily Meals</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse homemade meals from all local chefs.
          </p>
        </div>

        <button
          onClick={handleToggleSort}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-300 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition"
        >
          Sort by Price:
          <span className="font-semibold">
            {sortOrder === "asc" ? "Low → High ▲" : "High → Low ▼"}
          </span>
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMeals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
              />
              
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold line-clamp-1">
                {meal.foodName}
              </h3>

              <p className="text-sm text-gray-500">
                👨‍🍳 {meal.chefName}
              </p>

              <div className="flex items-center justify-between text-sm mt-2">
                <span className="font-bold text-red-600">
                  {meal.price}৳
                </span>
                <span className="text-yellow-600">
                  ⭐ {meal.rating}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                ⏱ {meal.estimatedDeliveryTime}
              </p>

              <Link
                to={`/meals/${meal._id}`}
                className="block text-center mt-3 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded-full border text-sm
              ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "border-red-400 text-red-600 hover:bg-red-50"
              }`}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`w-9 h-9 rounded-full text-sm font-semibold
                ${
                  currentPage === num + 1
                    ? "bg-red-500 text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded-full border text-sm
              ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "border-red-400 text-red-600 hover:bg-red-50"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Meals;
