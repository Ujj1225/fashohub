import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  useGetAddressQuery,
  useSaveAddressMutation,
} from "../../store/slices/deliveryApiSlice";
import CheckoutSteps from "../../components/CheckoutSteps";
import { toast } from "react-toastify";
import { useGetBagItemsQuery } from "../../store/slices/bagApiSlice";

const AddressScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state || !location.state.fromBag) {
    return <Navigate to="/" />;
  }

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [saveBtnShow, setSaveBtnShow] = useState(true);

  const { data: address, refetch } = useGetAddressQuery();
  const [saveAddress, { isLoading: savingAddress }] = useSaveAddressMutation();
  const {
    data: bag,
    isLoading: bagLoading,
    error: bagError,
    refetch: bagRefetch,
  } = useGetBagItemsQuery();

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveAddress({
        province,
        district,
        area,
        landmark,
        description,
        email,
      }).unwrap();
      refetch();
      toast.success("Address saved successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (address) {
      setProvince(address.province);
      setDistrict(address.district);
      setArea(address.area);
      setLandmark(address.landmark);
      setDescription(address.description);
      setEmail(address.email);
      setInputDisabled(true);
      setSaveBtnShow(false);
    }
  }, [address]);

  const handleProceedToPayment = () => {
    if (!district || !province || !area || !email) {
      toast.error("Please enter addresses to proceed.");
      return;
    } else if (saveBtnShow) {
      toast.error("Please save your address to continue");
    } else {
      navigate("/payment", {
        state: { fromAddress: true },
      });
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className="px-16 pt-8 sm:p-4 flex justify-around lg:px-8 lg:gap-x-4 md:flex-col md:items-center md:gap-y-4 sm:px-2">
        <form className="flex flex-col items-center justify-center border w-1/2 px-10 py-6 rounded-sm shadow-md md:w-2/3 sm:px-2 sm:w-full">
          <h1 className="font-bold text-2xl text-gray-600 mb-6">
            Shipping Address
          </h1>
          <div className="flex items-center gap-x-3 mb-4 w-full">
            <label className="text-gray-500 w-1/3 sm:text-sm">Province *</label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-2/3 py-1 px-3"
              required
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              disabled={inputDisabled}
              maxLength={"20"}
            />
          </div>
          <div className="flex items-center gap-x-3 mb-4 w-full">
            <label className="text-gray-500 w-1/3 sm:text-sm">District *</label>
            <input
              type="text"
              className="border border-gray-600 w-2/3 rounded-sm py-1 px-3 "
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={inputDisabled}
              maxLength={"20"}
            />
          </div>
          <div className="flex items-center gap-x-3 mb-4 w-full">
            <label className="text-gray-500 w-1/3 sm:text-sm">
              Area/Locality *
            </label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-2/3 py-1 px-3"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              disabled={inputDisabled}
              maxLength={"40"}
            />
          </div>
          <div className="flex items-center gap-x-3 mb-4 w-full">
            <label className="text-gray-500 w-1/3 sm:text-sm">
              Nearest Landmark
            </label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-2/3 py-1 px-3 "
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              disabled={inputDisabled}
              maxLength={"40"}
            />
          </div>
          <div className="flex items-center gap-x-3 mb-4 w-full">
            <label className="text-gray-500 w-1/3 sm:text-sm">
              Additional Description
            </label>
            <textarea
              rows={2}
              type="text"
              className="border border-gray-600 rounded-sm w-2/3 py-1 px-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={inputDisabled}
              maxLength={"100"}
            />
          </div>
          <div className="flex items-center gap-x-3 mb-4 w-full">
            <label className="text-gray-500 w-1/3 sm:text-sm">Email *</label>
            <input
              type="email"
              className="border border-gray-600 rounded-sm w-2/3 py-1 px-3"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={inputDisabled}
              maxLength={"40"}
            />
          </div>
          <button
            type="submit"
            className={`bg-[#FF3E6B] w-full py-2 rounded-sm text-white font-bold hover:bg-[#f46486] ${
              saveBtnShow ? "block" : "hidden"
            }`}
            onClick={handleAddressSubmit}
            disabled={savingAddress}
          >
            {savingAddress ? "Saving..." : "Save"}
          </button>
          <span
            className={`text-base font-semibold text-gray-600 mb-4 ${
              saveBtnShow ? "hidden" : "block"
            }`}
          >
            To change shipping address, goto{" "}
            <span
              className="text-blue-600 underline cursor-pointer hover:text-blue-400"
              onClick={() => {
                setInputDisabled(false);
                navigate("/myaddress");
              }}
            >
              Saved Address
            </span>
          </span>
        </form>
        <div className="w-1/3 border shadow-md px-4 py-6 rounded h-fit lg:w-1/2 md:w-2/3 sm:w-full">
          {bagLoading ? (
            <div className="text-center mt-4 font-bold">
              Loading your bag...
            </div>
          ) : bagError ? (
            <p className="text-xl font-bold text-center mt-4">
              {bagError.data.message}
            </p>
          ) : (
            <>
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
                type="submit"
                className="bg-[#FF3E6B] w-full text-center py-3 text-white font-bold rounded mt-4 text-sm cursor-pointer hover:bg-[#f46486]"
                onClick={handleProceedToPayment}
              >
                PROCEED TO PAYMENT
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressScreen;
