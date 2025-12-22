import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ChefHome = ({ chefId }) => {
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["chef-stats", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const meals = await axiosSecure.get(`/createMeals?chefId=${chefId}`);
      const orders = await axiosSecure.get(`/orders?chefId=${chefId}`);

      return {
        meals: meals.data.length,
        orders: orders.data.length,
        pending: orders.data.filter(o => o.orderStatus === "pending").length,
      };
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chef Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>Total Meals</p>
          <h3 className="text-xl font-bold">{data.meals}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Total Orders</p>
          <h3 className="text-xl font-bold">{data.orders}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Pending Orders</p>
          <h3 className="text-xl font-bold">{data.pending}</h3>
        </div>
      </div>
    </div>
  );
};

export default ChefHome;
