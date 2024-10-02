import React, { useState, useEffect } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/slices/userApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEditUser = () => {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState();
  const [isVendor, setIsVendor] = useState();
  const [isDeliveryPartner, setIsDeliveryPartner] = useState();

  const { uid } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetUserByIdQuery(uid);
  const [updateUser, { isLoading: updatingUser }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setIsAdmin(data.isAdmin);
      setIsVendor(data.isVendor);
      setIsDeliveryPartner(data.isDeliveryPartner);
    }
  }, [data]);

  const handleUserUpdate = async () => {
    try {
      await updateUser({ uid, name, isAdmin, isVendor, isDeliveryPartner });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/manage-users");
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
          <div className="mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">User ID</p>
            <input
              type="text"
              value={data._id}
              disabled
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="mt-2 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-2 py-1 rounded w-full"
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
          <div className="flex gap-x-1 mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">isAdmin</p>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <div className="flex gap-x-1 mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">isVendor</p>
            <input
              type="checkbox"
              checked={isVendor}
              onChange={(e) => setIsVendor(e.target.checked)}
            />
          </div>
          <div className="flex gap-x-1 mt-1 w-1/3 sm:w-3/4 xsm:w-full">
            <p className="font-bold">isDeliveryPartner</p>
            <input
              type="checkbox"
              checked={isDeliveryPartner}
              onChange={(e) => setIsDeliveryPartner(e.target.checked)}
            />
          </div>
          <button
            className="mt-2 bg-[#FF3E6B] px-8 py-2 rounded text-white font-bold"
            onClick={handleUserUpdate}
          >
            {updatingUser ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </>
  );
};

export default AdminEditUser;
