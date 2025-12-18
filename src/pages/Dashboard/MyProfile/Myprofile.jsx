import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (!user) {
    return <p className="text-center py-20">Loading profile...</p>;
  }

  const {
    displayName,
    email,
    photoURL,
    role = "user",
    status = "active",
    chefId,
    address,
  } = user;

  // ================= SEND ROLE REQUEST =================
  const handleRoleRequest = async (type) => {
    const requestData = {
      userName: displayName,
      userEmail: email,
      requestType: type, // chef | admin
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/role-requests", requestData);

    if (res.data.insertedId) {
      Swal.fire(
        "Request Sent",
        `Your request to become ${type} is pending approval.`,
        "success"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow rounded-2xl p-6 text-center space-y-4">
        <img
          src={photoURL}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />

        <h2 className="text-2xl font-bold">{displayName}</h2>
        <p className="text-sm text-gray-600">{email}</p>

        <div className="text-sm text-gray-700 space-y-1 mt-4">
          <p>
            <strong>Role:</strong>{" "}
            <span className="capitalize">{role}</span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{status}</span>
          </p>

          {role === "chef" && chefId && (
            <p>
              <strong>Chef ID:</strong> {chefId}
            </p>
          )}

          {address && (
            <p>
              <strong>Address:</strong> {address}
            </p>
          )}
        </div>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex justify-center gap-4 mt-6">
          {role === "user" && (
            <>
              <button
                onClick={() => handleRoleRequest("chef")}
                className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600"
              >
                Be a Chef
              </button>

              <button
                onClick={() => handleRoleRequest("admin")}
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600"
              >
                Be an Admin
              </button>
            </>
          )}

          {role === "chef" && (
            <button
              onClick={() => handleRoleRequest("admin")}
              className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
