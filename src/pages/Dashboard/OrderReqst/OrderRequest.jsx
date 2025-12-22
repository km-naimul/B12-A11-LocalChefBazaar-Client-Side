import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const OrderRequest = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: dbUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["db-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  const chefId = dbUser?.chefId;

 
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["chef-orders", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?chefId=${chefId}`);
      return res.data;
    },
  });

  
  const updateStatus = async (orderId, status) => {
    await axiosSecure.patch(`/orders/${orderId}`, { orderStatus: status });

    Swal.fire("Updated!", `Order ${status}`, "success");
    queryClient.invalidateQueries(["chef-orders"]);
  };

  if (isLoading || userLoading) {
    return <p className="text-center py-20">Loading orders...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Order Requests ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No order requests yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isPending = order.orderStatus === "pending";
const isAccepted = order.orderStatus === "accepted";
const isCancelled = order.orderStatus === "cancelled";
const isDelivered = order.orderStatus === "delivered";

            return (
              <div
                key={order._id}
                className="bg-white border rounded-xl p-5 shadow space-y-2"
              >
                <h3 className="text-xl font-bold">{order.mealName}</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                  <p><b>Price:</b> {order.price}৳</p>
                  <p><b>Quantity:</b> {order.quantity}</p>
                  <p><b>Status:</b> {order.orderStatus}</p>
                  <p><b>User Email:</b> {order.userEmail}</p>
                  <p><b>Address:</b> {order.userAddress}</p>
                  <p><b>Payment:</b> {order.paymentStatus}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 justify-end mt-4">

  {/* Cancel */}
  <button
    disabled={!isPending}
    onClick={() => updateStatus(order._id, "cancelled")}
    className={`btn btn-sm ${
      isPending ? "bg-red-500 text-white" : "btn-disabled"
    }`}
  >
    Cancel
  </button>

  {/* Accept */}
  <button
    disabled={!isPending}
    onClick={() => updateStatus(order._id, "accepted")}
    className={`btn btn-sm ${
      isPending ? "bg-green-500 text-white" : "btn-disabled"
    }`}
  >
    Accept
  </button>

  {/* Deliver */}
  <button
    disabled={!isAccepted}
    onClick={() => updateStatus(order._id, "delivered")}
    className={`btn btn-sm ${
      isAccepted ? "bg-blue-500 text-white" : "btn-disabled"
    }`}
  >
    Deliver
  </button>

</div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderRequest;
