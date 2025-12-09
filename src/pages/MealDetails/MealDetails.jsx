// src/pages/Meals/MealDetails.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

// আপাতত একই dummy data এখানে রাখা হলো
// পরে server থেকে single meal fetch করবে
const meals = [
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

const MealDetails = () => {
  const { id } = useParams();         // /meals/:id থেকে id নিবে
  const navigate = useNavigate();

  // ✅ এখানে login check – পরে Firebase auth এর সাথে replace করবে
  useEffect(() => {
    const isLoggedIn = true; // TODO: replace with your real auth logic

    if (!isLoggedIn) {
      navigate("/login"); // logged in না থাকলে login এ পাঠাবে
    }
  }, [navigate]);

  const meal = meals.find((m) => m._id === id);

  if (!meal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-center text-red-500 font-semibold">
          Meal not found.
        </p>
      </div>
    );
  }

  const handleOrderNow = () => {
    // future এ order page route use করবে: /order/:id
    navigate(`/order/${meal._id}`);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-72 object-cover rounded-2xl shadow-md"
        />

        {/* Info */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {meal.foodName}
          </h1>

          <p className="text-sm text-gray-600">{meal.shortDesc}</p>

          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Chef:</span> {meal.chefName}{" "}
              <span className="text-xs text-gray-500">
                (ID: {meal.chefId})
              </span>
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-red-600 font-bold">
                {meal.price}৳
              </span>
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {meal.rating}
            </p>
            <p>
              <span className="font-semibold">Delivery Area:</span>{" "}
              {meal.deliveryArea}
            </p>
            <p>
              <span className="font-semibold">Estimated Delivery:</span>{" "}
              {meal.estimatedDeliveryTime}
            </p>
            <p>
              <span className="font-semibold">Chef Experience:</span>{" "}
              {meal.chefExperience}
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-800 mt-2 mb-1">
              Ingredients:
            </p>
            <p className="text-sm text-gray-600">
              {meal.ingredients.join(", ")}
            </p>
          </div>

          <button
            onClick={handleOrderNow}
            className="mt-4 inline-flex items-center justify-center px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default MealDetails;
