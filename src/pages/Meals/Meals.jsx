// src/pages/Meals/Meals.jsx
import React, { useState } from "react";
import { Link } from "react-router";

const initialMeals = [
  {
    _id: "1",
    foodName: "Vegetable Stew",
    chefName: "Chef Rahim",
    chefId: "CH-001",
    foodImage:
      "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 220,
    rating: 4.6,
    deliveryArea: "Mirpur, Dhaka",
    shortDesc:
      "Comforting hearty stew packed with chunky veggies in a robust savory broth.",
    ingredients: ["Carrot", "Potato", "Peas", "Tomato", "Spices"],
    estimatedDeliveryTime: "35–45 min",
    chefExperience: "4 years of home cooking experience",
  },
  {
    _id: "2",
    foodName: "Chicken Burrito Protein Bowl",
    chefName: "Chef Anika",
    chefId: "CH-002",
    foodImage:
      "https://images.pexels.com/photos/5864613/pexels-photo-5864613.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 260,
    rating: 4.9,
    deliveryArea: "Dhanmondi, Dhaka",
    shortDesc:
      "Colorful, flavorful, high-protein burrito bowl with fresh veggies & chicken.",
    ingredients: ["Chicken", "Rice", "Corn", "Beans", "Cheese"],
    estimatedDeliveryTime: "30–40 min",
    chefExperience: "3 years in Mexican-style cuisine",
  },
  {
    _id: "3",
    foodName: "Quinoa Stuffed Peppers",
    chefName: "Chef Sadia",
    chefId: "CH-003",
    foodImage:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 240,
    rating: 4.7,
    deliveryArea: "Uttara, Dhaka",
    shortDesc:
      "Baked bell peppers filled with quinoa, beans and herbs – light yet filling.",
    ingredients: ["Quinoa", "Bell pepper", "Beans", "Onion", "Herbs"],
    estimatedDeliveryTime: "40–50 min",
    chefExperience: "5 years of vegetarian cooking",
  },
  {
    _id: "4",
    foodName: "Almond Crusted Chicken",
    chefName: "Chef Tanvir",
    chefId: "CH-004",
    foodImage:
      "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 280,
    rating: 4.5,
    deliveryArea: "Mohakhali, Dhaka",
    shortDesc:
      "Crispy oven-baked chicken coated with almond crumbs and light seasoning.",
    ingredients: ["Chicken", "Almond", "Garlic", "Butter", "Herbs"],
    estimatedDeliveryTime: "35–45 min",
    chefExperience: "6 years in continental dishes",
  },
  {
    _id: "5",
    foodName: "Easy Skillet Shrimp Fajitas",
    chefName: "Chef Maria",
    chefId: "CH-005",
    foodImage:
      "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 320,
    rating: 4.8,
    deliveryArea: "Banani, Dhaka",
    shortDesc:
      "Quick one-pan shrimp fajitas with colorful peppers and tangy tomato salsa.",
    ingredients: ["Shrimp", "Capsicum", "Onion", "Tortilla", "Spices"],
    estimatedDeliveryTime: "25–35 min",
    chefExperience: "7 years in seafood cooking",
  },
];

const Meals = () => {
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const sortedMeals = [...initialMeals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Header + sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            All <span className="text-red-600">Daily Meals</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse today&apos;s homemade meals from local chefs.
          </p>
        </div>

        <button
          onClick={handleToggleSort}
          className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-300 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition"
        >
          Sort by Price:{" "}
          <span className="font-semibold">
            {sortOrder === "asc" ? "Low → High ▲" : "High → Low ▼"}
          </span>
        </button>
      </div>

      {/* Card list */}
      <div className="space-y-4">
        {sortedMeals.map((meal) => (
          <article
            key={meal._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row"
          >
            {/* left image */}
            <div className="md:w-44 flex-shrink-0">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-40 md:h-full object-cover"
              />
            </div>

            {/* right content */}
            <div className="flex-1 p-4 flex flex-col gap-2">
              {/* title */}
              <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-tight">
                {meal.foodName}
              </h2>

              {/* short description */}
              <p className="text-sm text-gray-600 leading-snug">
                {meal.shortDesc}
              </p>

              {/* chef info */}
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">
                  Chef: {meal.chefName}
                </span>{" "}
                · Chef ID:{" "}
                <span className="font-mono text-gray-700">{meal.chefId}</span>
              </p>

              {/* meta row */}
              <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-700">
                <span>
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="text-red-600 font-bold">
                    {meal.price}৳
                  </span>
                </span>
                <span>
                  <span className="font-semibold">Rating:</span> ⭐{" "}
                  {meal.rating}
                </span>
                <span>
                  <span className="font-semibold">Delivery Area:</span>{" "}
                  {meal.deliveryArea}
                </span>
              </div>

              {/* bottom button */}
              <div className="mt-3 flex justify-end">
                <Link
                  to={`/meals/${meal._id}`}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
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
