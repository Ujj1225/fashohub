import React from "react";
import { useGetBagItemsQuery } from "../../store/slices/bagApiSlice";
import BagProductDetails from "../../components/BagProductDetails";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

const BagScreen = () => {
  const navigate = useNavigate();
  const {
    data: bag,
    isLoading: bagLoading,
    error: bagError,
    refetch,
  } = useGetBagItemsQuery();

  const handleCheckout = () => {
    navigate("/address", {
      state: { fromBag: true },
    });
  };

  return (
    <div>
      {bagLoading ? (
        <div className="text-center mt-4 font-bold">Loading your bag...</div>
      ) : bagError ? (
        <p className="text-xl font-bold text-center mt-4">
          {bagError.data.message}
        </p>
      ) : (
        <>
          <CheckoutSteps step1 />
          <div className="p-10 flex items-start justify-between gap-x-4 md:flex-col md:gap-y-8 md:px-20 sm:px-2">
            {/* left- product details section */}
            <div className="flex flex-col w-2/3 gap-y-4 md:w-full">
              {bag.products.map((product) => (
                <BagProductDetails
                  key={product.product}
                  product={product}
                  refetch={refetch}
                />
              ))}
            </div>

            {/* right- price details section */}
            <div className="w-1/3 border px-4 py-6 rounded md:w-full">
              <p className="flex text-gray-500 font-bold mb-6">
                PRICE DETAILS <span>&nbsp;({bag.products.length} items)</span>
              </p>
              {/* prices */}
              <div>
                <p className="my-2 flex justify-between text-gray-500">
                  Total MRP <span>रु {bag.itemPrice}</span>
                </p>
                <p className="mt-2 flex justify-between text-gray-500">
                  Shipping Price <span>रु {bag.shippingPrice}</span>
                </p>
                <p className="text-xs mb-2 font-thin text-gray-500">
                  shipping is free of cost for total mrp over रु 4000
                </p>

                <hr className="h-px my-4 border-0 dark:bg-gray-300" />
                <p className="my-2 text-lg font-bold text-gray-600 flex justify-between">
                  Total Amount <span>रु {bag.totalPrice}</span>
                </p>
              </div>
              <button
                className="bg-[#FF3E6B] w-full text-center py-3 text-white font-bold rounded mt-4 text-sm cursor-pointer hover:bg-[#f46486]"
                onClick={handleCheckout}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BagScreen;
