import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MealsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["homeMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/createMeals");
      return res.data;
    },
  });

 
  const sortedMeals = [...meals].sort((a, b) => a.price - b.price);

  if (isLoading) {
    return <p className="text-center py-20">Loading meals...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto py-6 px-4 bg-[#fcf1f1]">
     
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">
            Today&apos;s{" "}
            <span className="text-red-600">Daily Meals</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Freshly cooked by local home chefs, ready to deliver.
          </p>
        </div>

        <Link
          to="/meals"
          className="hidden sm:inline-block text-sm text-red-600 border border-red-600 px-3 py-1 rounded-full hover:bg-[#FF8947] hover:text-white transition"
        >
          See All Meals
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedMeals.slice(0, 6).map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-1">
                {meal.foodName}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                Chef:{" "}
                <span className="font-medium text-gray-700">
                  {meal.chefName}
                </span>
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-red-600">
                  {meal.price}৳
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  ⭐ {meal.rating || 0}
                </span>
              </div>

              <Link
                to={`/meals/${meal._id}`}
                className="mt-4 w-full text-center bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-500"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>

     
      <div className="mt-6 text-center sm:hidden">
        <Link
          to="/meals"
          className="inline-block text-sm text-[#FF8947] border border-[#FF8947] px-4 py-2 rounded-full hover:bg-[#FF8947] hover:text-white transition"
        >
          See All Meals
        </Link>
      </div>
    </section>
  );
};

export default MealsSection;
