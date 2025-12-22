// src/pages/Meals/Meals.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: meals = [] } = useQuery({
    queryKey: ["allMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/createMeals");
      return res.data;
    },
  });

  const sortedMeals = [...meals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-300 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition"
        >
          Sort by Price:
          <span className="font-semibold">
            {sortOrder === "asc" ? "Low → High ▲" : "High → Low ▼"}
          </span>
        </button>
      </div>

     
      <div className="space-y-4">
        {sortedMeals.map((meal) => (
          <article
            key={meal._id}
            className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row"
          >
         
            <div className="md:w-44 flex-shrink-0">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-40 md:h-full object-cover"
              />
            </div>

            
            <div className="flex-1 p-4 flex flex-col gap-2">
              <h2 className="text-lg md:text-xl font-bold uppercase">
                {meal.foodName}
              </h2>

              <p className="text-sm text-gray-600">
                Chef: <span className="font-semibold">{meal.chefName}</span>{" "}
                <span className="text-xs">(ID: {meal.chefId})</span>
              </p>

              <p className="text-sm text-gray-600">
                Ingredients: {meal.ingredients}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <span>
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="text-red-600 font-bold">
                    {meal.price}৳
                  </span>
                </span>

                <span>
                  <span className="font-semibold">Rating:</span> ⭐ {meal.rating}
                </span>

                <span>
                  <span className="font-semibold">Delivery:</span>{" "}
                  {meal.estimatedDeliveryTime}
                </span>
              </div>

              <div className="mt-3 flex justify-end">
                <Link
                  to={`/meals/${meal._id}`}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
                >
                  See Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Meals;
