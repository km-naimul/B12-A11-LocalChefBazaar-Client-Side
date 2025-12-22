import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Reviews from "../Home/Reviews/Reviews";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  const { data: meal, isLoading } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/createMeals/${id}`);
      return res.data;
    },
  });


  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?foodId=${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const handleReviewSubmit = (data) => {
    const reviewData = {
      foodId: id,
      mealName: meal.foodName,
      userEmail: user.email,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating: Number(data.rating),
      comment: data.comment,
    };

    axiosSecure.post("/reviews", reviewData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted!", "success");
        reset();
        queryClient.invalidateQueries(["reviews", id]);
        queryClient.invalidateQueries(["my-reviews"]);
      }
    });
  };


  const handleAddFavorite = () => {
    axiosSecure
      .get(`/favorites?mealId=${id}&userEmail=${user.email}`)
      .then((res) => {
        if (res.data && res.data._id) {
          Swal.fire("Already Added", "This meal is already in favorites", "info");
          return;
        }

        const favoriteData = {
          userEmail: user.email,
          mealId: id,
          mealName: meal.foodName,
          chefId: meal.chefId,
          chefName: meal.chefName,
          price: meal.price.toString(),
        };

        axiosSecure.post("/favorites", favoriteData).then(() => {
          Swal.fire("Success", "Added to favorites!", "success");
        });
      });
  };

  const handleOrderClick = () => {
    if (user?.status === "fraud") {
      Swal.fire({
        icon: "error",
        title: "Access Denied 🚫",
        text: "You are marked as a fraud user. You cannot place orders.",
        confirmButtonText: "OK",
      });
      return;
    }

    navigate(`/order/${meal._id}`);
  };

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!meal) {
    return (
      <p className="text-center py-20 text-red-500 font-semibold">
        Meal not found
      </p>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Meal Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-72 object-cover rounded-xl"
        />

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{meal.foodName}</h1>

          <p>
            <span className="font-semibold">Chef:</span> {meal.chefName} (ID:{" "}
            {meal.chefId})
          </p>

          <p>
            <span className="font-semibold">Price:</span>{" "}
            <span className="text-red-600 font-bold">{meal.price}৳</span>
          </p>

          <p>⭐ {meal.rating}</p>

          <p>
            <span className="font-semibold">Delivery:</span>{" "}
            {meal.estimatedDeliveryTime}
          </p>

          <p>
            <span className="font-semibold">Ingredients:</span>{" "}
            {Array.isArray(meal.ingredients)
              ? meal.ingredients.join(", ")
              : meal.ingredients}
          </p>

          <div className="flex gap-3 mt-4">
            {/* ✅ FIXED ORDER BUTTON */}
            <button
  onClick={handleOrderClick}
  className="px-6 py-2 rounded-full 
             bg-red-500 text-white 
             transition-all duration-300 
             hover:bg-white hover:text-red-500 hover:shadow-lg hover:-translate-y-0.5"
>
  Order Now
</button>

            <button
  onClick={handleAddFavorite}
  className="px-6 py-2 rounded-full 
             border border-red-400 text-red-600 
             transition-all duration-300
             hover:bg-red-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
>
  Add to Favorite ❤️
</button>
          </div>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold">Reviews</h2>
        <Reviews reviews={reviews} />
      </div>

      
      <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-2">
        <input
          {...register("rating", { required: true })}
          type="number"
          min={1}
          max={5}
          className="input input-bordered w-full"
          placeholder="Rating (1-5)"
        />
        <textarea
          {...register("comment", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Write comment"
        />
        <button className="btn bg-red-500 text-white">
          Give Review
        </button>
      </form>
    </section>
  );
};

export default MealDetails;
