import React from "react";
import { Link } from "react-router-dom";

const VendorHomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="font-bold text-2xl text-gray-600">
        Hi, Welcome to Vendor Panel.
      </p>
      <p className="font-bold text-lg text-gray-600">
        Please <Link to="/vendor/update-your-information" className="text-blue-600 hover:underline">update your information</Link>,
        if you haven't yet.
      </p>
    </div>
  );
};

export default VendorHomeScreen;
