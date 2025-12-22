import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FavoriteMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔥 Load favorite meals
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/favorites?userEmail=${user.email}`
      );
      return res.data;
    },
  });

  // 🗑️ Delete favorite
  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: "This meal will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favorites/${id}`).then(() => {
          Swal.fire(
            "Removed!",
            "Meal removed from favorites successfully.",
            "success"
          );
          queryClient.invalidateQueries(["favorites"]);
        });
      }
    });
  };

  if (isLoading) {
    return <p className="text-center">Loading favorites...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Favorite Meals ({favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite meals added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal Name</th>
                <th>Chef Name</th>
                <th>Price</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav, index) => (
                <tr key={fav._id}>
                  <td>{index + 1}</td>
                  <td>{fav.mealName}</td>
                  <td>{fav.chefName}</td>
                  <td>{fav.price || "N/A"}৳</td>
                  <td>
                    {new Date(fav.addedTime).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeal;
