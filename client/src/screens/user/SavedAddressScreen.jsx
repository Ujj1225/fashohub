import React, { useEffect, useState } from "react";
import {
  useEditAddressMutation,
  useGetAddressQuery,
  useSaveAddressMutation,
} from "../../store/slices/deliveryApiSlice";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";

const SavedAddressScreen = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [saveBtnShow, setSaveBtnShow] = useState(true);
  const [updateBtnShow, setUpdateBtnShow] = useState(false);

  const { data: address, refetch } = useGetAddressQuery();
  const [saveAddress, { isLoading: savingAddress }] = useSaveAddressMutation();
  const [editAddress, { isLoading: updatingAddress }] =
    useEditAddressMutation();

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

  const handleAddressEdit = async (e) => {
    e.preventDefault();
    try {
      await editAddress({
        province,
        district,
        area,
        landmark,
        description,
        email,
      }).unwrap();
      refetch();
      refetch();
      toast.success("Address updated successfully.");
      setProvince("");
      setDistrict("");
      setArea("");
      setLandmark("");
      setDescription("");
      setEmail("");
      setUpdateBtnShow(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="px-16 pt-8 sm:p-4">
        <form className="flex flex-col items-center justify-center border w-fit mx-auto px-10 py-6 sm:px-4 rounded-sm shadow-lg">
          <h1 className="font-bold text-2xl text-gray-600 mb-6">
            Your Address
          </h1>
          <div className="flex flex-col gap-x-3 mb-4">
            <label className="text-gray-500">Province *</label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-96 py-1 px-3 sm:w-60"
              required
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              disabled={inputDisabled}
              maxLength="20"
            />
          </div>
          <div className="flex flex-col gap-x-3 mb-4">
            <label className="text-gray-500">District *</label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-96 py-1 px-3 sm:w-60"
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={inputDisabled}
              maxLength={"20"}
            />
          </div>
          <div className="flex flex-col gap-x-3 mb-4">
            <label className="text-gray-500">Area/Locality *</label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-96 py-1 px-3 sm:w-60"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              disabled={inputDisabled}
              maxLength={"40"}
            />
          </div>
          <div className="flex flex-col gap-x-3 mb-4">
            <label className="text-gray-500">Nearest Landmark</label>
            <input
              type="text"
              className="border border-gray-600 rounded-sm w-96 py-1 px-3 sm:w-60"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              disabled={inputDisabled}
              maxLength={"40"}
            />
          </div>
          <div className="flex flex-col gap-x-3 mb-4">
            <label className="text-gray-500">Additional Description</label>
            <textarea
              rows={3}
              type="text"
              className="border border-gray-600 rounded-sm w-96 py-1 px-3 sm:w-60"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={inputDisabled}
              maxLength={"100"}
            />
          </div>
          <div className="flex flex-col gap-x-3 mb-4">
            <label className="text-gray-500">Email *</label>
            <input
              type="email"
              className="border border-gray-600 rounded-sm w-96 py-1 px-3 sm:w-60"
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
              updateBtnShow ? "hidden" : "block"
            } ${saveBtnShow ? "hidden" : "block"}`}
          >
            To edit address, click{" "}
            <span
              className="text-blue-600 underline cursor-pointer hover:text-blue-400"
              onClick={() => {
                setUpdateBtnShow(true);
                setInputDisabled(false);
              }}
            >
              here
            </span>
          </span>
          <button
            type="submit"
            className={`bg-[#FF3E6B] w-full py-2 rounded-sm text-white font-bold hover:bg-[#f46486] ${
              updateBtnShow ? "block" : "hidden"
            } ${saveBtnShow ? "hidden" : "block"}`}
            disabled={updatingAddress}
            onClick={handleAddressEdit}
          >
            {updatingAddress ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SavedAddressScreen;
