import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#EF4444"];

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const users = await axiosSecure.get("/users");
      const orders = await axiosSecure.get("/orders");
      const payments = await axiosSecure.get("/payments");

      const totalPayment = payments.data.reduce(
        (sum, p) => sum + p.amount,
        0
      );

      return {
        users: users.data.length,
        pending: orders.data.filter(o => o.orderStatus === "pending").length,
        delivered: orders.data.filter(o => o.orderStatus === "delivered").length,
        totalPayment,
      };
    },
  });

  const pieData = [
    { name: "Delivered", value: data.delivered || 0 },
    { name: "Pending", value: data.pending || 0 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>Total Users</p>
          <h3 className="text-xl font-bold">{data.users}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Total Payment</p>
          <h3 className="text-xl font-bold">${data.totalPayment}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Pending Orders</p>
          <h3 className="text-xl font-bold">{data.pending}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Delivered Orders</p>
          <h3 className="text-xl font-bold">{data.delivered}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
