import React from "react";
import AdminSideNav from "../screens/admin/AdminSideNav";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../store/slices/userApiSlice";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserProfileQuery(userInfo._id);

  return (
    <>
      {isLoading ? (
        <></>
      ) : error ? (
        <></>
      ) : (
        <div>
          {data && data.isAdmin ? (
            <div className="flex">
              <AdminSideNav />
              <Outlet />
            </div>
          ) : (
            <Navigate to="/" />
          )}
        </div>
      )}
    </>
  );
};

export default AdminLayout;
