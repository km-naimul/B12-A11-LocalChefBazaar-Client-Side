import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user: firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", firebaseUser?.email],
    enabled: !!firebaseUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${firebaseUser.email}/role`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading profile...</p>;
  }

  const {
    displayName = firebaseUser.displayName,
    email = firebaseUser.email,
    photoURL = firebaseUser.photoURL,
    role = "user",
    status = "active",
    chefId,
    address,
  } = dbUser;

  const handleRoleRequest = async (type) => {
    const requestData = {
      userName: displayName,
      userEmail: email,
      requestType: type,
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
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">

        {/* 🔥 Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-400 p-6 text-center">
          <img
            src={photoURL}
            alt="User"
            className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
          />
          <h2 className="text-2xl font-bold text-white mt-3">
            {displayName}
          </h2>
          <p className="text-sm text-red-100">{email}</p>
        </div>

        {/* 📄 Info Section */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Role</p>
              <p className="font-semibold capitalize">{role}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Status</p>
              <p
                className={`font-semibold capitalize ${
                  status === "fraud"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {status}
              </p>
            </div>

            {role === "chef" && chefId && (
              <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs text-gray-500">Chef ID</p>
                <p className="font-semibold">{chefId}</p>
              </div>
            )}

            {address && (
              <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs text-gray-500">Address</p>
                <p className="font-semibold">{address}</p>
              </div>
            )}
          </div>

          {/* 🎯 Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">

            {role === "user" && (
              <>
                <button
                  onClick={() => handleRoleRequest("chef")}
                  className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                >
                  Become a Chef
                </button>

                <button
                  onClick={() => handleRoleRequest("admin")}
                  className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  Request Admin
                </button>
              </>
            )}

            {role === "chef" && (
              <button
                onClick={() => handleRoleRequest("admin")}
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                Request Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
