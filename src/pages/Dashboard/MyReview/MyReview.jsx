import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState } from "react";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editReview, setEditReview] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // 🔥 Load my reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?userEmail=${user.email}`);
      return res.data;
    },
  });

  // 🗑️ Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete review?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then(() => {
          Swal.fire("Deleted!", "Review removed.", "success");
          queryClient.invalidateQueries(["my-reviews"]);
        });
      }
    });
  };

  // ✏️ Update
  const onUpdate = (data) => {
    axiosSecure.patch(`/reviews/${editReview._id}`, data).then(() => {
      Swal.fire("Updated!", "Review updated.", "success");
      setEditReview(null);
      reset();
      queryClient.invalidateQueries(["my-reviews"]);
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Reviews ({reviews.length})</h2>

      {reviews.map((review) => (
        <div key={review._id} className="border p-4 rounded">
          <h3 className="font-semibold">{review.mealName}</h3>
          <p>⭐ {review.rating}</p>
          <p>{review.comment}</p>
          <p className="text-xs">{new Date(review.date).toLocaleString()}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditReview(review)}
              className="btn btn-sm bg-blue-500 text-white"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(review._id)}
              className="btn btn-sm bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* UPDATE MODAL */}
      {editReview && (
        <form onSubmit={handleSubmit(onUpdate)} className="border p-4">
          <input
            defaultValue={editReview.rating}
            {...register("rating")}
            type="number"
            className="input input-bordered w-full"
          />
          <textarea
            defaultValue={editReview.comment}
            {...register("comment")}
            className="textarea textarea-bordered w-full"
          />
          <button className="btn bg-green-500 text-white mt-2">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default MyReview;
