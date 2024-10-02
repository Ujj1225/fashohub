import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import cod from "/images/cod.png";
import esewa from "/images/esewa.jpg";
import khalti from "/images/khalti.png";
import OrderSummary from "../../components/OrderSummary";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const location = useLocation();
  if (!location.state || !location.state.fromAddress) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="flex gap-x-2 mt-8 p-10 md:flex-col sm:p-2">
        <div className="w-1/2 md:w-full">
          <h2 className="text-xl text-gray-600 font-semibold mb-6">
            Select Payment Method
          </h2>
          <div
            className={`flex items-center border rounded p-4 cursor-pointer mb-1 ${
              paymentMethod === "COD" ? "bg-gray-200" : ""
            }`}
            onClick={() => setPaymentMethod("COD")}
          >
            <img src={cod} alt="cod" className="w-20 h-20 rounded" />
            <label
              htmlFor="COD"
              className="ml-2 cursor-pointer text-gray-600 font-bold text-lg"
            >
              Cash on Delivery
            </label>
          </div>
          <div
            className={`flex items-center border rounded p-4 cursor-pointer mb-1 ${
              paymentMethod === "Esewa" ? "bg-gray-200" : ""
            }`}
            onClick={() => setPaymentMethod("Esewa")}
          >
            <img src={esewa} alt="esewa" className="w-20 h-20 rounded" />
            <label
              htmlFor="Esewa"
              className="ml-2 cursor-pointer text-gray-600 font-bold text-lg"
            >
              Esewa
            </label>
          </div>
          <div
            className={`flex items-center border rounded p-4 cursor-pointer ${
              paymentMethod === "Khalti" ? "bg-gray-200" : ""
            }`}
            onClick={() => setPaymentMethod("Khalti")}
          >
            <img src={khalti} alt="khalti" className="w-20 h-20 rounded" />
            <label
              htmlFor="Khalti"
              className="ml-2 cursor-pointer text-gray-600 font-bold text-lg"
            >
              Khalti
            </label>
          </div>
        </div>
        <div className="w-1/2 md:w-full">
          {/* Display product and address details here */}
          <OrderSummary paymentMethod={paymentMethod} />
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
