// src/pages/Order/OrderPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// আপাতত Meals এর মতোই dummy meals ডাটা –
// চাইলে এগুলো আলাদা file থেকে share করতে পারো
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
  },
];

const OrderPage = () => {
  const { id } = useParams();          // /order/:id থেকে meal id
  const navigate = useNavigate();

  // এখানে পরে Firebase/Auth context থেকে user নেবে
  const userEmail = "customer@example.com"; // dummy

  const meal = meals.find((m) => m._id === id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mealName: meal?.foodName || "",
      price: meal?.price || 0,
      quantity: 1,
      chefId: meal?.chefId || "",
      userEmail: userEmail,
      userAddress: "",
    },
  });

  const quantity = watch("quantity") || 1;
  const price = meal?.price || 0;
  const totalPrice = price * quantity;

  if (!meal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-center text-red-500 font-semibold">
          Meal not found for this order.
        </p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const totalPriceCalc = meal.price * Number(data.quantity);

    const result = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is ${totalPriceCalc}৳. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const orderData = {
      // MongoDB-তে যাবার জন্য object
      // _id auto-generate হবে MongoDB থেকে
      foodId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity: Number(data.quantity),
      chefId: meal.chefId,
      paymentStatus: "Pending",
      userEmail: data.userEmail,
      userAddress: data.userAddress,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    // 👉 আপাতত console.log – পরে এখানে fetch/axios দিয়ে POST করবে
    console.log("ORDER TO SAVE:", orderData);

    // এখানে future এ API call করবে:
    // await fetch(`${baseURL}/orders`, { method: "POST", body: JSON.stringify(orderData), ... })

    await Swal.fire("Success", "Order placed successfully!", "success");

    // চাইলে অন্য পেজে পাঠাতে পারো (যেমন My Orders)
    // navigate("/dashboard/my-orders");
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Confirm <span className="text-red-600">Your Order</span>
      </h1>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
        {/* meal summary */}
        <div className="flex gap-4 items-center">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{meal.foodName}</h2>
            <p className="text-sm text-gray-500">
              Chef: {meal.chefName} (ID: {meal.chefId})
            </p>
            <p className="text-sm text-gray-500">
              Delivery Area: {meal.deliveryArea}
            </p>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* mealName & price (read only) */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Name
              </label>
              <input
                {...register("mealName")}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (per meal)
              </label>
              <input
                {...register("price")}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          {/* quantity & chefId */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                {...register("quantity", { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.quantity && (
                <p className="text-xs text-red-500 mt-1">
                  Please select at least 1 item.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chef ID
              </label>
              <input
                {...register("chefId")}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          {/* user email & address */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                {...register("userEmail")}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                {...register("userAddress", { required: true })}
                placeholder="House 12, Road 7, Mirpur DOHS, Dhaka"
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.userAddress && (
                <p className="text-xs text-red-500 mt-1">
                  Delivery address is required.
                </p>
              )}
            </div>
          </div>

          {/* total price */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Order Status:{" "}
              <span className="font-semibold text-yellow-600">pending</span>
            </p>
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-red-600">{totalPrice}৳</span>
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
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
