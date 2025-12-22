import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminHome from "./AdminHome";
import ChefHome from "./ChefHome";
import UserHome from "./UserHome";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading dashboard...</p>;
  }

  if (dbUser.role === "admin") {
    return <AdminHome />;
  }

  if (dbUser.role === "chef") {
    return <ChefHome chefId={dbUser.chefId} />;
  }

  return <UserHome />;
};

export default DashboardHome;
