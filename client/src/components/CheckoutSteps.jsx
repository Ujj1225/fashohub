import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3 }) => {
  const navigate = useNavigate();
  const handleAddressClick = () => {
    navigate("/address", {
      state: { fromBag: true },
    });
  };
  const handlePaymentClick = () => {
    navigate("/payment", {
      state: { fromAddress: true },
    });
  };
  return (
    <div className="flex items-center justify-center w-1/4 mx-auto mt-4 lg:w-1/3 md:w-1/2 sm:w-full">
      {step1 ? (
        <Link
          to="/bag"
          className="text-[#20BD99] border-b-[1px] border-[#20BD99]"
        >
          Bag
        </Link>
      ) : (
        <p>Bag</p>
      )}
      <span className={`mx-1 ${step2 ? "text-[#20BD99]" : "text-gray-300"}`}>
        ----------
      </span>
      {step2 ? (
        <p
          // to="/address"
          onClick={handleAddressClick}
          className="text-[#20BD99] border-b-[1px] border-[#20BD99] cursor-pointer"
        >
          Address
        </p>
      ) : (
        <p className=" text-gray-300">Address</p>
      )}
      <span className={`mx-1 ${step3 ? "text-[#20BD99]" : "text-gray-300"}`}>
        ----------
      </span>
      {step3 ? (
        <p
          className="text-[#20BD99] border-b-[1px] border-[#20BD99] cursor-pointer"
          onClick={handlePaymentClick}
        >
          Payment
        </p>
      ) : (
        <p className="text-gray-300">Payment</p>
      )}
    </div>
  );
};

export default CheckoutSteps;
