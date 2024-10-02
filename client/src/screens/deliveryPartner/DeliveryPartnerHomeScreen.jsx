import React from "react";
import { Link } from "react-router-dom";

const DeliveryPartnerHomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="font-bold text-2xl text-gray-600">
        Hi, Welcome to Delivery Partner Panel.
      </p>
      <p className="font-bold text-lg text-gray-600">
        Please check your{" "}
        <Link
          to="/delivery-partner/assigned-orders"
          className="text-blue-600 hover:underline"
        >
          assigned orders.
        </Link>
      </p>
    </div>
  );
};

export default DeliveryPartnerHomeScreen;
