import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const OrderPage = () => {
  const { id } = useParams(); // meal id
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  
  if (!user) {
    navigate("/login");
  }

  const { data: meal, isLoading } = useQuery({
    queryKey: ["orderMeal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/createMeals/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      userAddress: "",
    },
  });

  const quantity = watch("quantity") || 1;
  const price = meal?.price || 0;
  const totalPrice = price * quantity;

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

  const onSubmit = async (data) => {
  const totalPrice = meal.price * Number(data.quantity);

  const result = await Swal.fire({
    title: "Confirm Order",
    text: `Your total price is ${totalPrice}৳. Do you want to confirm the order?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, confirm",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  const orderData = {
    foodId: meal._id,
    mealName: meal.foodName,
    price: meal.price,
    quantity: Number(data.quantity),
    chefId: meal.chefId,
    paymentStatus: "Pending",
    userEmail: user.email,          
    userAddress: data.userAddress,
    orderStatus: "pending",
    orderTime: new Date().toISOString(),
  };

  const res = await axiosSecure.post("/orders", orderData);

  if (res.data.insertedId) {
    Swal.fire("Success", "Order placed successfully!", "success");
    navigate("/dashboard/my-orders"); // optional
  }
};



  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Confirm <span className="text-red-600">Your Order</span>
      </h1>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
        {/* Meal summary */}
        <div className="flex gap-4 items-center">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{meal.foodName}</h2>
            <p className="text-sm text-gray-500">
              Chef ID: {meal.chefId}
            </p>
          </div>
        </div>

    
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Meal name & price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meal Name</label>
              <input
                value={meal.foodName}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price (per item)
              </label>
              <input
                value={meal.price}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
          </div>

         
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                {...register("quantity", { required: true })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.quantity && (
                <p className="text-xs text-red-500 mt-1">
                  Quantity is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Chef ID</label>
              <input
                value={meal.chefId}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
          </div>

        
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                value={user.email}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Address
              </label>
              <input
                {...register("userAddress", { required: true })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="House 12, Road 7, Mirpur DOHS"
              />
              {errors.userAddress && (
                <p className="text-xs text-red-500 mt-1">
                  Address is required
                </p>
              )}
            </div>
          </div>

         
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm">
              Order Status:{" "}
              <span className="text-yellow-600 font-semibold">pending</span>
            </p>
            <p className="text-lg font-bold">
              Total: <span className="text-red-600">{totalPrice}৳</span>
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderPage;
