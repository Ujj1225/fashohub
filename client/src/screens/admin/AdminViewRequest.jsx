import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetRequestByIdQuery,
  useApproveVendorshipMutation,
} from "../../store/slices/vendorApiSlice";
import { toast } from "react-toastify";

const AdminViewRequest = () => {
  const { rid } = useParams();
  const { data, isLoading, error, refetch } = useGetRequestByIdQuery(rid);

  const [approveVendorship, { isLoading: approvalLoading }] =
    useApproveVendorshipMutation();

  const handleApprove = async () => {
    try {
      await approveVendorship(rid).unwrap();
      toast.success("User request approved. User is now a vendor.");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="font-bold text-center mt-4">Loading user details...</p>
      ) : error ? (
        <p className="font-bold text-center mt-4">{error?.data?.message}</p>
      ) : (
        <div className="py-14 px-2 flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <div className="mt-2 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Name</p>
            <input
              type="text"
              value={data.name}
              className="border px-2 py-1 rounded w-full"
              disabled
            />
          </div>
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Phone</p>
            <input
              type="text"
              value={data.phone}
              disabled
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Email</p>
            <input
              type="text"
              value={data.email}
              disabled
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Citizenship Front</p>
            <img src={data.citizenshipFront} alt="na" />
          </div>
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Citizenship Back</p>
            <img src={data.citizenshipBack} className="border" alt="na" />
          </div>
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Pan Card</p>
            <img src={data.panCard} alt="na" />
          </div>
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Company Registration</p>
            <img src={data.companyRegistration} alt="na" />
          </div>

          {data.approved ? (
            <Link
              to={`/admin/user/${data.user}/edit`}
              className="text-blue-500 hover:underline mt-4 border p-2 rounded border-blue-400 "
            >
              View User Profile
            </Link>
          ) : (
            <button
              className="mt-2 bg-[#FF3E6B] px-8 py-2 rounded text-white font-bold"
              onClick={handleApprove}
              disabled={approvalLoading}
            >
              {approvalLoading ? "Approving..." : "Approve User"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default AdminViewRequest;
