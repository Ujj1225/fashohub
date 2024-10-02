import React from "react";
import { useGetMyOrdersQuery } from "../store/slices/orderApiSlice";
import { Skeleton } from "@mantine/core";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const UserOrders = () => {
  const location = useLocation();
  const isMyOrdersPage = location.pathname === "/myorders";

  const {
    data: myorders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery();

  return (
    <div className={`w-full ${isMyOrdersPage ? "px-10 py-5 xsm:p-2" : ""}`}>
      <h2 className="font-bold text-gray-500 mb-2 text-lg">Your Orders</h2>
      {ordersLoading ? (
        <div className="flex flex-col gap-y-4">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : ordersError ? (
        <p className="text-gray-500 font-bold">{ordersError?.data?.message}</p>
      ) : (
        <div className="border-t border-l border-r rounded-sm border-gray-600">
          <div className="flex items-center justify-between h-fit">
            <p className="w-2/5 border-b border-r border-gray-600 px-2 py-0.5 font-bold text-gray-500 sm:px-1 xsm:text-sm">
              Order ID
            </p>
            <p className="w-1/5 border-b border-r border-gray-600 px-2 py-0.5 font-bold text-gray-500 sm:px-1 xsm:text-sm">
              Date
            </p>
            <p className="w-1/5 border-b border-r border-gray-600 px-2 py-0.5 font-bold text-gray-500 sm:px-1 xsm:text-sm">
              Payment
            </p>
            <p className="w-1/5 border-b border-gray-600 px-2 py-0.5 font-bold text-gray-500 sm:px-1 xsm:text-sm">
              Delivery
            </p>
          </div>
          {myorders.map((order) => (
            <div
              className="flex items-center justify-between h-fit"
              key={order._id}
            >
              <p className="w-2/5 border-b border-r border-gray-600 px-2 py-0.5 text-gray-500 cursor-pointer hover:underline text-ellipsis whitespace-nowrap overflow-hidden sm:px-1 ">
                <Link to={`/order/${order._id}`}>{order._id}</Link>
              </p>
              <p className="w-1/5 border-b border-r border-gray-600 px-2 py-0.5 text-gray-500 sm:px-1 md:hidden">
                {order.createdAt.slice(0, 10)}
              </p>
              <p className="w-1/5 border-b border-r border-gray-600 px-2 py-0.5 text-gray-500 sm:px-1 hidden md:block">
                {order.createdAt.slice(5, 10)}
              </p>
              <p className="w-1/5 border-b border-r border-gray-600 px-2 py-0.5 text-gray-500 overflow-hidden sm:px-1">
                {order.isPaid ? (
                  <FaCheck size={24} className="text-green-500" />
                ) : (
                  <FaTimes size={24} className=" text-red-700" />
                )}
              </p>
              <p className="w-1/5 border-b rounded-l-sm rounded-r-sm border-gray-600 px-2 py-0.5  text-gray-500  sm:px-1">
                {order.isDelivered ? (
                  <FaCheck size={24} className="text-green-500" />
                ) : (
                  <FaTimes size={24} className=" text-red-700" />
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
