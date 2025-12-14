import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: meals = [] } = useQuery({
    queryKey: ['myMeals', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/createMeals?email=${user.email}`);
      return res.data;
    }
  });

  // ================= DELETE =================
  const handleDeleteMeal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/createMeals/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Meal deleted successfully.", "success");
              queryClient.invalidateQueries(['myMeals', user?.email]);
            }
          });
      }
    });
  };

  // ================= UPDATE =================
  const handleUpdateMeal = (id) => {
    // redirect to update page with meal id
    navigate(`/dashboard/update-meal/${id}`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        All of My Meals : {meals.length}
      </h2>

      <div className="space-y-4">
        {meals.map(meal => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image */}
            <div className="md:w-48">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-40 md:h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 p-4 space-y-2">
              <h3 className="text-xl font-bold">{meal.foodName}</h3>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Chef:</span> {meal.chefName}
                <span className="ml-2 text-xs">(ID: {meal.chefId})</span>
              </p>

              <p className="text-sm">
                <span className="font-semibold">Ingredients:</span>{" "}
                {meal.ingredients}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <span>
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="text-orange-600 font-bold">
                    {meal.price}৳
                  </span>
                </span>

                <span>
                  <span className="font-semibold">Rating:</span> ⭐ {meal.rating}
                </span>

                <span>
                  <span className="font-semibold">Delivery:</span>{" "}
                  {meal.estimatedDeliveryTime}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleUpdateMeal(meal._id)}
                  className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDeleteMeal(meal._id)}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
