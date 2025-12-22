import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const CreateMeal = () => {
  const { register, handleSubmit } = useForm();
  const { user: firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // 🔥 MongoDB user load (role + status + chefId)
  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["dbUser", firebaseUser?.email],
    enabled: !!firebaseUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${firebaseUser.email}/role`
      );
      return res.data;
    },
  });

  // 🔑 imgBB
  const imageHostingKey = import.meta.env.VITE_image_host_key;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  // 🚫 FRAUD CHEF BLOCK
  if (dbUser?.status === "fraud") {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Access Denied 🚫
        </h2>
        <p className="text-gray-600 mb-6">
          You are marked as a fraud user. You cannot create meals.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn bg-red-500 text-white"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handleCreateMeal = async (data) => {
    try {
      const imageFile = data.foodImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();

      if (!imgData.success) {
        Swal.fire("Error", "Image upload failed", "error");
        return;
      }

      const mealData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imgData.data.display_url,
        price: Number(data.price),
        rating: Number(data.rating),
        ingredients: data.ingredients,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: dbUser.chefId,
        userEmail: firebaseUser.email,
        createdAt: new Date(),
      };

      Swal.fire({
        title: "Are you sure?",
        text: "This meal will be added!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, create it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/createMeals", mealData).then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Meal created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow px-6 py-6">
        <h2 className="text-2xl font-bold mb-4">Create Meal</h2>

        <form onSubmit={handleSubmit(handleCreateMeal)} className="space-y-4">

          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Food Name</label>
            <input
              {...register("foodName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Chef Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Chef Name</label>
            <input
              {...register("chefName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Food Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("foodImage", { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Price & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                {...register("rating")}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium mb-1">Ingredients</label>
            <input
              {...register("ingredients", { required: true })}
              placeholder="Rice, Chicken, Onion"
              className="input input-bordered w-full"
            />
          </div>

          {/* Delivery Time & Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Delivery Time
              </label>
              <input
                {...register("estimatedDeliveryTime", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Chef Experience
              </label>
              <input
                {...register("chefExperience", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Chef ID & User Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Chef ID</label>
              <input
                value={dbUser?.chefId || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">User Email</label>
              <input
                value={firebaseUser?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          <button className="btn bg-orange-500 text-white w-full">
            Create Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
