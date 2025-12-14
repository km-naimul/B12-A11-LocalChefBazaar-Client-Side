import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CreateMeal = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 🔑 imgBB key (env থেকে)
  const imageHostingKey = import.meta.env.VITE_image_host_key;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const handleCreateMeal = async (data) => {
    try {
      const imageFile = data.foodImage[0];

      // image upload
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
        foodImage: imgData.data.display_url, // ✅ IMAGE URL
        price: data.price,
        rating: data.rating,
        ingredients: data.ingredients,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: data.chefId,
        userEmail: user?.email,
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
            Swal.fire("Created!", "Meal added successfully.", "success");
          });
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow px-6 py-6">
        <h2 className="text-2xl font-bold mb-4">Create Meal</h2>

        <form onSubmit={handleSubmit(handleCreateMeal)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Food Name</label>
            <input
              type="text"
              {...register("foodName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Chef Name</label>
            <input
              type="text"
              {...register("chefName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Food Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("foodImage", { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>

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
                {...register("rating")}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ingredients</label>
            <input
              type="text"
              {...register("ingredients", { required: true })}
              className="input input-bordered w-full"
              placeholder="Rice, Chicken, Onion"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Time
              </label>
              <input
                type="text"
                {...register("estimatedDeliveryTime", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Chef Experience
              </label>
              <input
                type="text"
                {...register("chefExperience", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Chef ID</label>
              <input
                type="text"
                {...register("chefId")}
                className="input input-bordered w-full bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">User Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                {...register("userEmail")}
                className="input input-bordered w-full bg-gray-100"
                readOnly
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
