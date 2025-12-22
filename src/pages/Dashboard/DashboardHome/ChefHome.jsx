import { FaUtensils, FaClipboardList, FaPlus } from "react-icons/fa";

const ChefHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">👨‍🍳 Chef Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaUtensils className="text-3xl text-orange-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">My Meals</h3>
          <p className="text-gray-500">Meals you created</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaClipboardList className="text-3xl text-blue-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Order Requests</h3>
          <p className="text-gray-500">Orders from customers</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaPlus className="text-3xl text-green-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Create Meal</h3>
          <p className="text-gray-500">Add new food item</p>
        </div>
      </div>
    </div>
  );
};

export default ChefHome;
