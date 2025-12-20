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

  // ✅ MAKE ADMIN
  const handleMakeAdmin = async (user) => {
    const confirm = await Swal.fire({
      title: "Make Admin?",
      text: `${user.displayName} will become Admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const roleInfo = { role: "admin" };

    await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);

    Swal.fire("Success", "User promoted to Admin!", "success");

    queryClient.invalidateQueries(["users"]);
  };

  // ✅ REMOVE ADMIN
  const handleRemoveAdmin = async (user) => {
    const confirm = await Swal.fire({
      title: "Remove Admin?",
      text: `${user.displayName} will be downgraded to USER`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const roleInfo = { role: "user" };

    await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);

    Swal.fire("Success", "Admin role removed!", "success");

    queryClient.invalidateQueries(["users"]);
  };

  // ✅ MAKE FRAUD
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
                    <div className="font-bold">{user.displayName}</div>
                  </div>
                </td>

                <td>{user.email}</td>

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

                <td className="space-x-1">
                  {/* ADMIN ROLE ACTION */}
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-xs bg-yellow-500 text-black"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <>
                      {/* MAKE ADMIN */}
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs bg-blue-500 text-white"
                      >
                        Make Admin
                      </button>

                      {/* MAKE FRAUD */}
                      {user.status !== "fraud" && (
                        <button
                          onClick={() => handleMakeFraud(user)}
                          className="btn btn-xs bg-red-500 text-white ml-1"
                        >
                          Make Fraud
                        </button>
                      )}
                    </>
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
