import React, { useState } from "react";
import { useGetAllOrdersQuery } from "../../store/slices/orderApiSlice";
import { Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";
import { MdMessage, MdAssignmentInd } from "react-icons/md";
import { FaTimes, FaCheck } from "react-icons/fa";

const AdminManageOrders = () => {
  const [filter, setFilter] = useState("all");

  const {
    data: allOrders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery();

  const filteredOrders = allOrders?.filter((user) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unpaid" && !user.isPaid) ||
      (filter === "undelivered" && !user.isDelivered);
    return matchesFilter;
  });

  const handleSendMessage = (oid) => {
    alert(oid);
  };

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold">All Orders</h2>

      {/* Search and Filter Section */}
      <div className="flex my-4 w-full justify-around">
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="unpaid">Unpaid Orders</option>
          <option value="undelivered">Undelivered Orders</option>
        </select>
      </div>
      {/* {loadingDelete && (
        <p className="text-lg font-semibold">Deleting user...</p>
      )} */}
      {ordersLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : ordersError ? (
        <p>{ordersError?.data?.meesage}</p>
      ) : (
        <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
          <thead>
            <tr>
              <th className="border p-2">Order Id</th>
              <th className="border p-2 sm:hidden">Date</th>
              <th className="border p-2 sm:hidden">Payment</th>
              <th className="border p-2 sm:hidden">Delivery</th>
              <th className="border p-2">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="border p-2 overflow-hidden whitespace-nowrap text-ellipsis hover:underline hover:text-blue-800">
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="border p-2 sm:hidden">
                  <span className="block ">{order.createdAt.slice(0, 10)}</span>
                  {/* <span className="hidden sm:block">
                    {order.createdAt.slice(5, 10)}
                  </span> */}
                </td>
                <td className="border p-2 sm:hidden">
                  {order.isPaid ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2 sm:hidden">
                  {order.isDelivered ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2">
                  {order.assignedTo ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2 xsm:p-1">
                  {/* <button
                    className="ml-4 sm:ml-1"
                    onClick={() => handleSendMessage(order._id)}
                  >
                    <MdMessage style={{ color: "green" }} size={24} />
                  </button> */}
                  <Link to={`/admin/order-assignment/${order._id}`}>
                    <button className="ml-2 sm:ml-1">
                      <MdAssignmentInd style={{ color: "blue" }} size={24} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManageOrders;
