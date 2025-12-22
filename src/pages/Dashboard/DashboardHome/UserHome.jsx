import { FaShoppingBag, FaStar, FaHeart } from "react-icons/fa";

const UserHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">👋 Welcome Back!</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaShoppingBag className="text-3xl text-red-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">My Orders</h3>
          <p className="text-gray-500">View your order history</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaStar className="text-3xl text-yellow-400 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">My Reviews</h3>
          <p className="text-gray-500">Your food reviews</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaHeart className="text-3xl text-pink-500 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Favorites</h3>
          <p className="text-gray-500">Saved meals</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
