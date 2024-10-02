import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../../store/slices/userApiSlice";
import { Skeleton } from "@mantine/core";
import {
  useRequestVendorshipMutation,
  useGetMyRequestQuery,
} from "../../store/slices/vendorApiSlice";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "../../store/slices/productsApiSlice";

const VendorRequestScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [citizenshipFront, setCitizenshipFront] = useState("");
  const [citizenshipBack, setCitizenshipBack] = useState("");
  const [panCard, setPanCard] = useState("");
  const [companyRegistration, setCompanyRegistration] = useState("");

  const { uid } = useParams();
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetUserProfileQuery(uid);
  const [requestVendorship, { isLoading }] = useRequestVendorshipMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const {
    data: myRequest,
    isLoading: myRequestLoading,
    error: myRequestError,
  } = useGetMyRequestQuery();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone);
    }
  }, [profile]);

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        phone,
        email,
        citizenshipFront,
        citizenshipBack,
        panCard,
        companyRegistration,
      };
      await requestVendorship(productData).unwrap();
      toast.success("Application Submitted");
      navigate("/vendor");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const uploadFileHandler = async (e, imageField) => {
    const file = e.target.files[0];
    if (file.size > 400000) {
      // 200kb in bytes
      toast.error("Each image must be less than 400KB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      switch (imageField) {
        case "citizenshipFront":
          setCitizenshipFront(res.image);
          break;
        case "citizenshipBack":
          setCitizenshipBack(res.image);
          break;
        case "panCard":
          setPanCard(res.image);
          break;
        case "companyRegistration":
          setCompanyRegistration(res.image);
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="py-10 sm:px-2">
      {profileLoading || myRequestLoading ? (
        <div className="flex flex-col gap-y-4 w-1/2 sm:w-full mx-auto">
          <Skeleton height={75} /> <Skeleton height={75} />
          <Skeleton height={75} /> <Skeleton height={75} />
          <Skeleton height={75} /> <Skeleton height={75} />
        </div>
      ) : profileError ? (
        <p>{profileError.data.message}</p>
      ) : profile.isVendor ? (
        <Navigate to="/" />
      ) : myRequest ? (
        <p className="font-bold mt-4 text-center text-gray-500 text-xl">
          Your Request Is Pending
        </p>
      ) : (
        <form
          className="flex flex-col items-center gap-y-4 w-1/2 md:w-3/4 sm:w-full mx-auto border p-4 rounded shadow"
          onSubmit={handleApplicationSubmit}
        >
          <p className="text-lg font-bold text-gray-500">
            Vendorship Application Form
          </p>
          <div className="w-full">
            <p className="font-bold text-gray-600">Name</p>
            <input
              type="text"
              value={name}
              className="border rounded px-2 py-1 w-full"
              disabled
              maxLength={"30"}
            />
          </div>
          <div className="w-full">
            <p className="font-bold text-gray-600">Phone</p>
            <input
              type="text"
              value={phone}
              className="border rounded px-2 py-1 w-full"
              disabled
              maxLength={"10"}
            />
          </div>
          <div className="w-full">
            <p className="font-bold text-gray-600">Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Enter email"
              required
              maxLength={"40"}
            />
          </div>
          <div className="w-full">
            <p className="font-bold text-gray-600">Citizenship Front</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Citizenship Front"
                value={citizenshipFront}
                onChange={(e) => setCitizenshipFront(e.target.value)}
                className="px-2 py-1 border"
                disabled
                required
              />
              <input
                type="file"
                required
                onChange={(e) => uploadFileHandler(e, "citizenshipFront")}
                disabled={loadingUpload}
              />
              {loadingUpload && <p className="text-sm font-bold">Loading...</p>}
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold text-gray-600">Citizenship Back</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Citizenship Back"
                value={citizenshipBack}
                onChange={(e) => setCitizenshipBack(e.target.value)}
                className="px-2 py-1 border"
                required
                disabled
              />
              <input
                type="file"
                required
                onChange={(e) => uploadFileHandler(e, "citizenshipBack")}
                disabled={loadingUpload}
              />
              {loadingUpload && <p className="text-sm font-bold">Loading...</p>}
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold text-gray-600">Pan Card</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Pan Card"
                value={panCard}
                onChange={(e) => setPanCard(e.target.value)}
                className="px-2 py-1 border"
                required
                disabled
              />
              <input
                type="file"
                required
                onChange={(e) => uploadFileHandler(e, "panCard")}
                disabled={loadingUpload}
              />
              {loadingUpload && <p className="text-sm font-bold">Loading...</p>}
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold text-gray-600">Company Registration</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Company Registration"
                value={companyRegistration}
                onChange={(e) => setCompanyRegistration(e.target.value)}
                className="px-2 py-1 border"
                required
                disabled
              />
              <input
                type="file"
                required
                onChange={(e) => uploadFileHandler(e, "companyRegistration")}
                disabled={loadingUpload}
              />
              {loadingUpload && <p className="text-sm font-bold">Loading...</p>}
            </div>
          </div>

          <button
            type="submit"
            className="text-sm font-bold bg-blue-600 rounded text-center w-1/2 text-white py-2"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
};

export default VendorRequestScreen;
