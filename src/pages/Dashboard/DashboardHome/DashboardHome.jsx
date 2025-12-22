import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminHome from "./AdminHome";
import ChefHome from "./ChefHome";
import UserHome from "./UserHome";
import Loading from "../../../components/Loading/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["dashboard-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (dbUser.role === "admin") return <AdminHome />;
  if (dbUser.role === "chef") return <ChefHome />;
  return <UserHome />;
};

export default DashboardHome;
