import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DeliveryPartnerSideNav from "../screens/deliveryPartner/DeliveryPartnerSideNav";
import { useGetUserProfileQuery } from "../store/slices/userApiSlice";

const DeliveryPartnerLayout = () => {
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
          {data && data.isDeliveryPartner ? (
            <div className="flex">
              <DeliveryPartnerSideNav />
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

export default DeliveryPartnerLayout;
