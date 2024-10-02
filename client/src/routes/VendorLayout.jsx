import React from "react";
import VendorSideNav from "../screens/vendor/VendorSideNav";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../store/slices/userApiSlice";

const VendorLayout = () => {
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
          {data && data.isVendor ? (
            <div className="flex">
              <VendorSideNav />
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

export default VendorLayout;
