import React from "react";
import {
  useDeleteRequestMutation,
  useGetAllRequestsQuery,
} from "../../store/slices/vendorApiSlice";
import { IoEyeSharp } from "react-icons/io5";
import { Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminVendorRequests = () => {
  const {
    data: requests,
    isLoading: requestsLoading,
    error: requestsError,
    refetch,
  } = useGetAllRequestsQuery();

  const [deleteRequest, { isLoading: loadingDelete }] =
    useDeleteRequestMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the request?")) {
      try {
        await deleteRequest(id).unwrap();
        refetch();
        toast.success("Request deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold">Vendor Requests</h2>
      {loadingDelete && (
        <p className="text-lg font-semibold">Deleting request...</p>
      )}

      {requestsLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : requestsError ? (
        <p>{requestsError?.data?.meesage}</p>
      ) : (
        <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border p-2 overflow-hidden whitespace-nowrap text-ellipsis w-auto hover:underline hover:text-blue-800">
                  <Link to={`/admin/request/${request._id}/edit`}>
                    {request.name}
                  </Link>
                </td>
                <td className="border p-2">{request.phone}</td>
                <td className="border py-2 pl-6 pr-0 ">
                  <Link to={`/admin/request/${request._id}/edit`}>
                    <button className="mr-4 sm:mr-1 border p-1 rounded bg-green-600">
                      <IoEyeSharp color="white" />
                    </button>
                  </Link>
                  <button
                    className="ml-4 sm:ml-1"
                    onClick={() => handleDelete(request._id)}
                    disabled={loadingDelete}
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

export default AdminVendorRequests;
