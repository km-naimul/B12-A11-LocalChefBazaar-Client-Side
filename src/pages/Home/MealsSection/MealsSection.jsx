import React from 'react';
import { Link } from "react-router";

const dummyMeals = [
  {
    _id: "1",
    foodName: "Chicken Biriyani",
    chefName: "Chef Rahim",
    foodImage:
      "https://images.pexels.com/photos/5864613/pexels-photo-5864613.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 250,
    rating: 4.8,
    deliveryArea: "Mirpur, Dhaka",
  },
  {
    _id: "2",
    foodName: "Beef Tehari",
    chefName: "Chef Anika",
    foodImage:
      "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 280,
    rating: 4.6,
    deliveryArea: "Dhanmondi, Dhaka",
  },
  {
    _id: "3",
    foodName: "Grilled Chicken Salad",
    chefName: "Chef Sadia",
    foodImage:
      "https://images.pexels.com/photos/3731474/pexels-photo-3731474.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 220,
    rating: 4.9,
    deliveryArea: "Uttara, Dhaka",
  },
  {
    _id: "4",
    foodName: "Vegetable Khichuri",
    chefName: "Chef Tanvir",
    foodImage:
      "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 180,
    rating: 4.5,
    deliveryArea: "Mohakhali, Dhaka",
  },
  {
    _id: "5",
    foodName: "Pasta Alfredo",
    chefName: "Chef Maria",
    foodImage:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 260,
    rating: 4.7,
    deliveryArea: "Banani, Dhaka",
  },
  {
    _id: "6",
    foodName: "Homestyle Burger",
    chefName: "Chef Kamal",
    foodImage:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 230,
    rating: 4.4,
    deliveryArea: "Bashundhara, Dhaka",
  },
];

const MealsSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4 bg-[#fcf1f1]">
      {/* Section header */}
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

        {/* সব meals দেখানোর জন্য future এ /meals route use করবে */}
        <Link
          to="/meals"
          className="hidden sm:inline-block text-sm text-red-600 border border-red-600 px-3 py-1 rounded-full hover:bg-[#FF8947] hover:text-white transition"
        >
          See All Meals
        </Link>
      </div>

      {/* 6 cards grid layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyMeals.map((meal) => (
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

              <p className="text-sm text-gray-500 mb-1">
                Area: {meal.deliveryArea}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-red-600">
                  {meal.price}৳
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  ⭐ {meal.rating}
                </span>
              </div>

              {/* নিচের button future এ /meals/:id e navigate করাবে */}
              <button
                className="mt-4 w-full bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 hover:bg-red-500 "
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ছোট স্ক্রিনের জন্য নিচে See All Meals button */}
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