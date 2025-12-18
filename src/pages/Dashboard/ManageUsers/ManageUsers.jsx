import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ MAKE FRAUD HANDLER
  const handleMakeFraud = async (user) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Mark ${user.displayName} as fraud?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/users/fraud/${user._id}`);

    Swal.fire("Success", "User marked as fraud!", "success");

    queryClient.invalidateQueries(["users"]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Manage Users: {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="user avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>

                <td className="font-medium">{user.email}</td>

                <td className="capitalize font-semibold">{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      user.status === "fraud"
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td>
                  {/* ✅ SHOW BUTTON CONDITION */}
                  {user.role !== "admin" && user.status !== "fraud" ? (
                    <button
                      onClick={() => handleMakeFraud(user)}
                      className="btn btn-xs bg-red-500 text-white"
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
