import React, { useState, useEffect } from "react";
import {
  useAddVendorDetailsMutation,
  useGetVendorDetailsQuery,
} from "../../store/slices/vendorApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const VendorInformation = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [addVendorDetails, { isLoading: adding }] =
    useAddVendorDetailsMutation();
  const { data, isLoading } = useGetVendorDetailsQuery(userInfo._id);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addVendorDetails({
        name,
        location,
        contact,
        description,
      }).unwrap();
      console.log(res);
      toast.success("Your information has been saved.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  useEffect(() => {
    if (data) {
      setName(data.name);
      setContact(data.contact);
      setLocation(data.location);
      setDescription(data.description);
    }
  }, [data]);
  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full md:px-2">
      <h2 className="text-xl font-semibold">Update Your Information</h2>
      <form
        className="bg-gray-50 px-4 py-6 mt-4 rounded-lg shadow-lg w-2/3 md:px-4 md:w-full"
        onSubmit={submitHandler}
      >
        <div className="mt-4 mb-2">
          <p>Shop Name</p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter your shop name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={"50"}
          />
        </div>
        <div className="mb-2">
          <p>Shop Location</p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter your shop location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength={"50"}
          />
        </div>
        <div className="mb-2">
          <p>Contact Number</p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength={"40"}
          />
        </div>
        <div className="mb-2">
          <p>Description</p>
          <textarea
            rows="4"
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter your shop description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={"200"}
          />
        </div>
        <button
          className="bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-600 text-white font-bold"
          disabled={adding}
        >
          {adding ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default VendorInformation;
