import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["user-summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const orders = await axiosSecure.get(`/orders?email=${user.email}`);
      const favorites = await axiosSecure.get(`/favorites?userEmail=${user.email}`);
      const reviews = await axiosSecure.get(`/reviews?userEmail=${user.email}`);

      return {
        orders: orders.data.length,
        favorites: favorites.data?.length || 0,
        reviews: reviews.data.length,
      };
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome {user?.displayName}</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>My Orders</p>
          <h3 className="text-xl font-bold">{data.orders}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Favorite Meals</p>
          <h3 className="text-xl font-bold">{data.favorites}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>My Reviews</p>
          <h3 className="text-xl font-bold">{data.reviews}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
