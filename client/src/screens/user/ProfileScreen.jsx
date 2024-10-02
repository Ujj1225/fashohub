import React, { useState, useEffect } from "react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../store/slices/userApiSlice";
import { toast } from "react-toastify";
import { Divider, Skeleton } from "@mantine/core";
import UserOrders from "../../components/UserOrders";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
    refetch,
  } = useGetUserProfileQuery();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUserProfile({ name, password }).unwrap();
        toast.success("Profile updated successfully!");
        refetch();
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };
  return (
    <>
      <div className="p-10 flex gap-x-4 sm:flex-col sm:gap-y-8 xsm:p-2">
        <div className="w-fit sm:mx-auto sm:w-full">
          <h2 className="font-bold text-gray-500 mb-2 text-lg">User Profile</h2>
          {profileLoading ? (
            <div>
              <Skeleton height={500} width="300px" />
            </div>
          ) : profileError ? (
            <p>{profileError?.data?.message || profileError.error}</p>
          ) : (
            <>
              <form className="flex flex-col gap-y-4" onSubmit={submitHandler}>
                <div className="flex flex-col gap-y-1">
                  <label className="font-bold text-gray-600">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-black rounded w-80 px-2 py-1 lg:w-60 sm:w-full"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="font-bold text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    className="border border-black rounded w-80 px-2 py-1 bg-gray-100 lg:w-60 sm:w-full"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="font-bold text-gray-600">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-black rounded w-80 px-2 py-1 lg:w-60 sm:w-full"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="font-bold text-gray-600">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-black rounded w-80 px-2 py-1 lg:w-60 sm:w-full"
                  />
                </div>
                <button className="bg-[#FF3E6B] hover:bg-[#f46486] rounded w-80 px-2 py-1 text-white font-bold text-center lg:w-60 sm:w-full">
                  {isLoading ? "Updating" : "Update"}
                </button>
              </form>
              {!profile.isVendor && (
                <Link to={`/${profile._id}/vendor-request`}>
                  <button className="mt-3 text-center w-full border border-gray-400 text-sm font-bold text-gray-500 py-1 rounded hover:border-gray-900">
                    Request Vendorship
                  </button>
                </Link>
              )}
              {profile.isAdmin && (
                <Link to="/admin">
                  <button className="mt-3 text-center w-full border border-gray-400 text-sm font-bold text-gray-500 py-1 rounded hover:border-gray-900">
                    Admin Panel
                  </button>
                </Link>
              )}
              {profile.isVendor && (
                <Link to="/vendor">
                  <button className="mt-3 text-center w-full border border-gray-400 text-sm font-bold text-gray-500 py-1 rounded hover:border-gray-900">
                    Vendor Panel
                  </button>
                </Link>
              )}
              {profile.isDeliveryPartner && (
                <Link to="/delivery-partner">
                  <button className="mt-3 text-center w-full border border-gray-400 text-sm font-bold text-gray-500 py-1 rounded hover:border-gray-900">
                    Delivery Partner Panel
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
        <Divider orientation="vertical" className="min-h-[50vh] sm:hidden" />
        <UserOrders />
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
