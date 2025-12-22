import { FaUsers, FaMoneyBillWave, FaTruck } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🛡 Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaUsers className="text-3xl text-indigo-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Total Users</h3>
          <p className="text-gray-500">All registered users</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaMoneyBillWave className="text-3xl text-green-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Total Payments</h3>
          <p className="text-gray-500">Platform earnings</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaTruck className="text-3xl text-red-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Orders</h3>
          <p className="text-gray-500">Pending & Delivered</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
