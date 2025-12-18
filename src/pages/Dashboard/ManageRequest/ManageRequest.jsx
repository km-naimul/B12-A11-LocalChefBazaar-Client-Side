import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔥 সব role request load হবে (pending + approved + rejected)
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  // ✅ Approve / Reject handler
  const handleAction = async (id, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status} this request`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/role-requests/${id}`, { status });

    Swal.fire("Success", `Request ${status}`, "success");

    // 🔄 data reload → status update instantly দেখাবে
    queryClient.invalidateQueries(["roleRequests"]);
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading requests...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">
        Manage Role Requests ({requests.length})
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              {/* User Info */}
              <p>
                <span className="font-semibold">Name:</span> {req.userName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {req.userEmail}
              </p>
              <p>
                <span className="font-semibold">Requested Role:</span>{" "}
                <span className="capitalize">{req.requestType}</span>
              </p>

              {/* Status & Time */}
              <div className="flex flex-wrap gap-6 mt-3 text-sm">
                <p>
                  <span className="font-semibold">Request Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      req.requestStatus === "pending"
                        ? "bg-yellow-500"
                        : req.requestStatus === "approved"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Request Time:</span>{" "}
                  {new Date(req.requestTime).toLocaleString()}
                </p>
              </div>

              {/* Buttons (only if pending) */}
              {req.requestStatus === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAction(req._id, "approved")}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleAction(req._id, "rejected")}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRequest;
