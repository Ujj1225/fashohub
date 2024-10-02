import React from "react";
import { useGetMyProductOrdersQuery } from "../../store/slices/orderApiSlice";
import { Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const VendorOrders = () => {
  const {
    data: myOrders,
    isLoading: myOrdersLoading,
    error: myOrdersError,
  } = useGetMyProductOrdersQuery();
  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full sm:px-2">
      <h2 className="text-xl font-semibold">Orders With Your Products</h2>
      {myOrdersLoading ? (
        <div className="flex flex-col gap-y-4">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : myOrdersError ? (
        <p>{myOrdersError.data.message || myOrdersError.error}</p>
      ) : (
        <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
          <thead>
            <tr>
              <th className="border p-2">Order Id</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2 md:hidden">P. Method</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr key={order._id}>
                <td className="border p-2 overflow-hidden whitespace-nowrap text-ellipsis hover:underline hover:text-blue-800">
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="border p-2">
                  <span className="block sm:hidden">
                    {order.createdAt.slice(0, 10)}
                  </span>
                  <span className="hidden sm:block">
                    {order.createdAt.slice(5, 10)}
                  </span>
                </td>
                <td className="border p-2">
                  {order.isPaid ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2">
                  {order.isDelivered ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2 md:hidden">{order.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorOrders;
