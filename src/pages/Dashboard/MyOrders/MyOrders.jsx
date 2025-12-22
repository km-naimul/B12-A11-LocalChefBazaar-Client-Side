import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading orders...</p>;
  }

  const handlePay = (order) => {
    Swal.fire({
      title: "Proceed to Payment?",
      text: `You need to pay ${order.price * order.quantity}৳`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    })
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        My Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const totalPrice = order.price * order.quantity;

            return (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow border border-gray-100 p-5 space-y-2"
              >
                {/* Food Name */}
                <h3 className="text-xl font-bold text-gray-900">
                  {order.mealName}
                </h3>

                {/* Chef Info */}
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Chef:</span>{" "}
                  {order.chefName || "N/A"}{" "}
                  <span className="text-xs">(ID: {order.chefId})</span>
                </p>

                {/* Order Info */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700 mt-2">
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    {order.price}৳
                  </p>

                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {order.quantity}
                  </p>

                  <p>
                    <span className="font-semibold">Total:</span>{" "}
                    <span className="text-red-600 font-bold">
                      {totalPrice}৳
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Order Status:</span>{" "}
                    <span className="capitalize">
                      {order.orderStatus}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    <span
                      className={`font-semibold ${
                        order.paymentStatus === "Pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Order Time:</span>{" "}
                    {new Date(order.orderTime).toLocaleString()}
                  </p>
                </div>

                {/* Pay Button */}
                {order.paymentStatus === "Pending" &&
  order.orderStatus === "accepted" && (
    <div className="flex justify-end mt-4">
      <Link to={`/dashboard/payment/${order._id}`}>
        <button className="px-5 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600">
          Pay Now
        </button>
      </Link>
    </div>
)}


              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
