import React from "react";
import { useGetAssignedOrdersQuery } from "../../store/slices/orderApiSlice";
import { Skeleton } from "@mantine/core";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const DeliveryPartnerOrders = ({ type, title, errMsg }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      {type.length === 0 ? (
        <p className="mt-1 font-bold border p-2 rounded bg-green-200">{errMsg}</p>
      ) : (
        <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
          <thead>
            <tr>
              <th className="border p-2">Order Id</th>
              <th className="border p-2">Date</th>
              <th className="border p-2 sm:hidden">Payment</th>
              <th className="border p-2 md:hidden">Delivery</th>
              <th className="border p-2 md:hidden">P. Method</th>
            </tr>
          </thead>
          <tbody>
            {type.map((order) => (
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
                <td className="border p-2 md:hidden">{order.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const DeliveryPartnerAssignedOrders = () => {
  const { data, isLoading, error } = useGetAssignedOrdersQuery();

  const deliveredOrders = data?.filter((order) => order.isDelivered);
  const undeliveredOrders = data?.filter((order) => !order.isDelivered);

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      {isLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : error ? (
        <p>{error?.data?.meesage}</p>
      ) : data.length === 0 ? (
        <p className="mt-4 font-bold">
          You havent been assigned any order yet.
        </p>
      ) : (
        <>
          <DeliveryPartnerOrders
            type={undeliveredOrders}
            errMsg={"There are no currently assigned orders."}
            title={"Undelivered Orders"}
          />
          <DeliveryPartnerOrders
            type={deliveredOrders}
            errMsg={"You haven't yet delivered orders."}
            title={"Delivered Orders"}
          />
        </>
      )}
    </div>
  );
};

export default DeliveryPartnerAssignedOrders;
