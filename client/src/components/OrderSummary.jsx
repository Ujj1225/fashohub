import React from "react";
import {
  useGetBagItemsQuery,
  useRemoveAllMutation,
} from "../store/slices/bagApiSlice";
import { useGetAddressQuery } from "../store/slices/deliveryApiSlice";
import { usePlaceOrderMutation } from "../store/slices/orderApiSlice";
import { Skeleton } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ paymentMethod }) => {
  const navigate = useNavigate();

  const {
    data: bag,
    isLoading: bagLoading,
    error: bagError,
    refetch: bagRefetch,
  } = useGetBagItemsQuery();
  const {
    data: address,
    isLoading: addressLoading,
    error: addressError,
  } = useGetAddressQuery();

  const [placeOrder, { isLoading: orderLoading, isError: orderError }] =
    usePlaceOrderMutation();
  const [removeAll] = useRemoveAllMutation();

  const handlePlaceOrder = async () => {
    try {
      const res = await placeOrder({ paymentMethod }).unwrap();
      toast.success(res.message);
      await removeAll();
      bagRefetch();
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleEsewaPayment = () => {
    alert("esewa payment");
  };

  const handleKhaltiPayment = () => {
    alert("khalti payment");
  };

  return (
    <div className="px-4 md:px-0 md:mt-10">
      <h2 className="text-xl text-gray-600 font-semibold mb-6">
        Order Summary
      </h2>
      {bagLoading || addressLoading ? (
        <div className="p-2 flex flex-col gap-y-4">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : bagError || addressError ? (
        <p>{bagError.data.message || addressError.data.message}</p>
      ) : (
        <div className="border rounded p-2 flex flex-col">
          <div>
            <p className="font-bold text-gray-500 mb-1">Products:</p>
            {bag.products.map((product) => (
              <div
                key={product.product}
                className="flex items-center gap-x-4 sm:gap-x-2 mb-2"
              >
                <img src={product.image} alt="img" className="w-10 h-10" />
                <div className="flex sm:flex-col w-full">
                  <p className="font-bold text-gray-600 line-clamp-1 w-full">
                    {product.name}
                  </p>
                  <div className="flex w-full gap-x-4">
                    <p className="text-gray-500 font-semibold w-1/2">
                      Size: {product.size}
                    </p>
                    <p className="text-gray-500 font-semibold w-1/2">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 sm:flex sm:flex-col">
              Address:
              <span className="font-semibold text-gray-500 ml-2 sm:ml-0">
                {address.area.toUpperCase()}, {address.district.toUpperCase()},{" "}
                {address.province.toUpperCase()}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 sm:flex sm:flex-col">
              Email:
              <span className="font-semibold text-gray-500 ml-2 sm:ml-0">
                {address.email}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 sm:flex sm:flex-col">
              Subtotal:
              <span className="font-semibold text-gray-500 ml-2 sm:ml-0">
                Rs. {bag.totalPrice}
              </span>
            </p>
          </div>
          <div className="mt-4">
            {paymentMethod === "COD" && (
              <button
                onClick={handlePlaceOrder}
                className="bg-[#FF3E6B] w-full text-center py-3 text-white font-bold rounded text-sm cursor-pointer hover:bg-[#f46486]"
              >
                {orderLoading ? "Placing Order..." : "Place Order"}
              </button>
            )}
            {paymentMethod === "Esewa" && (
              <button
                onClick={handleEsewaPayment}
                className="bg-[#FF3E6B] w-full text-center py-3 text-white font-bold rounded text-sm cursor-pointer hover:bg-[#f46486]"
              >
                Pay with Esewa
              </button>
            )}
            {paymentMethod === "Khalti" && (
              <button
                onClick={handleKhaltiPayment}
                className="bg-[#FF3E6B] w-full text-center py-3 text-white font-bold rounded text-sm cursor-pointer hover:bg-[#f46486]"
              >
                Pay with Khalti
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
