import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateMeal = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [mealImage, setMealImage] = useState("");

  // load single meal
  useEffect(() => {
    axiosSecure.get(`/createMeals/${id}`).then((res) => {
      reset(res.data);
      setMealImage(res.data.foodImage);
    });
  }, [id, axiosSecure, reset]);

  const onSubmit = (data) => {
    axiosSecure.put(`/createMeals/${id}`, data).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Meal updated successfully.", "success");
        navigate("/dashboard/my-meals");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Meal</h2>

      
      {mealImage && (
        <div className="mb-6 flex justify-center">
          <img
            src={mealImage}
            alt="Meal"
            className="w-64 h-40 object-cover rounded-xl border"
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

       
        <div>
          <label className="block text-sm font-semibold mb-1">
            Food Name
          </label>
          <input
            {...register("foodName")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Price (৳)
          </label>
          <input
            {...register("price")}
            type="number"
            className="input input-bordered w-full"
          />
        </div>

       
        <div>
          <label className="block text-sm font-semibold mb-1">
            Rating (0–5)
          </label>
          <input
            {...register("rating")}
            type="number"
            step="0.1"
            className="input input-bordered w-full"
          />
        </div>

        
        <div>
          <label className="block text-sm font-semibold mb-1">
            Ingredients
          </label>
          <textarea
            {...register("ingredients")}
            className="textarea textarea-bordered w-full"
            placeholder="Rice, Chicken, Onion, Spices"
          />
        </div>

      
        <div>
          <label className="block text-sm font-semibold mb-1">
            Estimated Delivery Time
          </label>
          <input
            {...register("estimatedDeliveryTime")}
            className="input input-bordered w-full"
            placeholder="30–45 minutes"
          />
        </div>

       
        <button
          type="submit"
          className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-4"
        >
          Update Meal
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
