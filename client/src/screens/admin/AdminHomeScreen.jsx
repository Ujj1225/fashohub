import React from "react";
import { useAdminStatsQuery } from "../../store/slices/statsApiSlice";
import { Skeleton } from "@mantine/core";

const AdminHomeScreen = () => {
  const { data, isLoading, error } = useAdminStatsQuery();
  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold xsm:text-lg">
        Hi, Welcome to Admin Panel
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-10 my-auto w-[75%] md:w-full">
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
          <Skeleton height={75} />
        </div>
      ) : error ? (
        <p>{error?.data?.meesage}</p>
      ) : (
        <div className="grid grid-cols-3 gap-10 my-auto md:mt-10 sm:grid-cols-2 xsm:gap-x-4">
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.usersCount}</p>
            <p className="font-bold text-center">Total Users</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.vendorsCount}</p>
            <p className="font-bold text-center">Total Vendors</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.deliveryPartnersCount}</p>
            <p className="font-bold text-center">Total Delivery Partners</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.ordersCount}</p>
            <p className="font-bold text-center">Total Orders</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.paidOrdersCount}</p>
            <p className="font-bold text-center">Total Paid Orders</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.deliveredOrdersCount}</p>
            <p className="font-bold text-center">Total Delivered Orders</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.productsCount}</p>
            <p className="font-bold text-center">Total Products</p>
          </div>
          <div className="flex flex-col items-center border p-2 bg-gray-300 rounded shadow">
            <p className="font-black text-4xl">{data.bagsCount}</p>
            <p className="font-bold text-center">Total Bags Pending</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomeScreen;
