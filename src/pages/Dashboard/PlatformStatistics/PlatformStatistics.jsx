import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const COLORS = ["#10B981", "#EF4444"];

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  
  const { data: payments = [] } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });


  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });


  const totalUsers = users.length;

  const totalPaymentAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;

  
  const orderData = [
    { name: "Pending", value: pendingOrders },
    { name: "Delivered", value: deliveredOrders },
  ];

  const paymentChartData = [
    { name: "Total Payment", amount: totalPaymentAmount },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Platform Statistics</h2>

     
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Total Users</h4>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Total Payment</h4>
          <p className="text-2xl font-bold">৳ {totalPaymentAmount}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Orders Pending</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Orders Delivered</h4>
          <p className="text-2xl font-bold text-green-600">
            {deliveredOrders}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Order Status</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {orderData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Payments Overview</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
