import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../store/slices/userApiSlice";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Skeleton } from "@mantine/core";
import "@mantine/core/styles.css";

const AdminManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const {
    data: allUsers,
    isLoading: usersLoading,
    error: usersError,
    refetch,
  } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const filteredUsers = allUsers?.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesFilter =
      filter === "all" ||
      (filter === "admin" && user.isAdmin) ||
      (filter === "vendor" && user.isVendor) ||
      (filter === "deliveryPartner" && user.isDeliveryPartner);
    return matchesSearchTerm && matchesFilter;
  });

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold">All Users</h2>

      {/* Search and Filter Section */}
      <div className="flex my-4 w-full justify-around">
        <input
          type="text"
          placeholder="Search by name or phone"
          className="border p-2 mr-4 rounded w-1/2 xsm:placeholder:text-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="admin">Admin</option>
          <option value="vendor">Vendors</option>
          <option value="deliveryPartner">Delivery Partners</option>
        </select>
      </div>
      {loadingDelete && (
        <p className="text-lg font-semibold">Deleting user...</p>
      )}
      {usersLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : usersError ? (
        <p>{usersError?.data?.meesage}</p>
      ) : (
        <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2 sm:hidden">Admin</th>
              <th className="border p-2 md:hidden">Vendor</th>
              <th className="border p-2 md:hidden">Delivery Partner</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border p-2 overflow-hidden whitespace-nowrap text-ellipsis w-auto hover:underline hover:text-blue-800">
                  <Link to={`/admin/user/${user._id}`}>{user.name}</Link>
                </td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2 sm:hidden">
                  {user.isAdmin ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2 md:hidden">
                  {user.isVendor ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border p-2 md:hidden">
                  {user.isDeliveryPartner ? (
                    <FaCheck size={24} className="text-green-500" />
                  ) : (
                    <FaTimes size={24} className=" text-red-700" />
                  )}
                </td>
                <td className="border py-2 pl-6 pr-0 ">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="mr-4 sm:mr-1">
                      <FaEdit color="blue" />
                    </button>
                  </Link>
                  <button
                    className="ml-4 sm:ml-1"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManageUsers;
