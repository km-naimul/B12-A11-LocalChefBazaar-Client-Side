// src/pages/Meals/MealDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// আপাতত একই dummy meals data – পরে server থেকে আনবে
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

// Dummy initial reviews (same format as requirement)
const initialReviews = [
  {
    _id: "r1",
    foodId: "1",
    reviewerName: "Ariana Sultana",
    reviewerImage: "https://i.ibb.co/sample-user.jpg",
    rating: 5,
    comment: "The food was delicious! Perfect taste and fast delivery.",
    date: "2025-01-15T12:45:00Z",
  },
  {
    _id: "r2",
    foodId: "2",
    reviewerName: "Mahmudul Hasan",
    reviewerImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 4,
    comment: "Loved the portion size and spices. Will order again.",
    date: "2025-01-16T10:20:00Z",
  },
];

const MealDetails = () => {
  const { id } = useParams(); // /meals/:id থেকে id
  const navigate = useNavigate();

  // later এখানে real auth context থেকে user আসবে
  const user = {
    email: "user@example.com",
    displayName: "Demo User",
    photoURL: "https://i.ibb.co/sample-user.jpg",
  };

  // login check (TODO: replace with real auth)
  useEffect(() => {
    const isLoggedIn = true; // এখন true, পরে user context check করবে

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const meal = meals.find((m) => m._id === id);

  // reviews state – শুধুমাত্র এই meal-এর জন্য
  const [reviews, setReviews] = useState(
    initialReviews.filter((r) => r.foodId === id)
  );

  // favorite গুলো local state এ – পরে API তে যাবে
  const [favorites, setFavorites] = useState([]);

  // review modal control
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    navigate(`/order/${meal._id}`);
  };

  // ✅ Favorite button click
  const handleAddFavorite = () => {
    const alreadyFav = favorites.some(
      (fav) => fav.mealId === meal._id && fav.userEmail === user.email
    );

    if (alreadyFav) {
      Swal.fire(
        "Already added",
        "This meal is already in your favorites.",
        "info"
      );
      return;
    }

    const favData = {
      _id: `fav-${Date.now()}`, // dummy
      userEmail: user.email,
      mealId: meal._id, // এখানে চাইলে আলাদা mealId string ও দিতে পারো
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price.toString(),
      addedTime: new Date().toISOString(),
    };

    // পরে এখানে POST /favorites API কল করবে
    console.log("FAVORITE TO SAVE:", favData);

    setFavorites((prev) => [...prev, favData]);

    Swal.fire("Success", "Meal added to favorites!", "success");
  };

  // ✅ Review submit
  const onSubmitReview = (data) => {
    const newReview = {
      _id: `review-${Date.now()}`,
      foodId: meal._id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating: Number(data.rating),
      comment: data.comment,
      date: new Date().toISOString(),
    };

    // পরে এখানে POST /reviews API কল করবে
    console.log("REVIEW TO SAVE:", newReview);

    // UI তে সাথে সাথে যোগ করো
    setReviews((prev) => [newReview, ...prev]);

    Swal.fire("Success", "Review submitted successfully!", "success");

    reset();
    setIsReviewOpen(false);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* main details */}
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
              <span className="text-red-600 font-bold">{meal.price}৳</span>
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

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleOrderNow}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
            >
              Order Now
            </button>

            <button
              onClick={handleAddFavorite}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-red-400 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
            >
              Add to Favorite ❤️
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
            >
              Give Review
            </button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to review this meal!
          </p>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-100 rounded-xl p-3 flex gap-3 items-start"
              >
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {review.reviewerName}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {new Date(review.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-xs text-yellow-500 font-semibold">
                      ⭐ {review.rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Give a Review for {meal.foodName}
            </h3>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1–5)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  {...register("rating", { required: true })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="5"
                />
                {errors.rating && (
                  <p className="text-xs text-red-500 mt-1">
                    Rating is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  {...register("comment", { required: true })}
                  className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                  placeholder="Write your experience..."
                />
                {errors.comment && (
                  <p className="text-xs text-red-500 mt-1">
                    Comment is required.
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MealDetails;
