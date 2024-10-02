import { Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  useGetBannersQuery,
  useAddBannerMutation,
} from "../../store/slices/bannerApiSlice";
import { useUploadProductImageMutation } from "../../store/slices/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminBannerScreen = () => {
  const [image1, setImage1] = useState("");
  const [link1, setLink1] = useState("");
  const [image2, setImage2] = useState("");
  const [link2, setLink2] = useState("");
  const [image3, setImage3] = useState("");
  const [link3, setLink3] = useState("");
  const [image4, setImage4] = useState("");
  const [link4, setLink4] = useState("");
  const [image5, setImage5] = useState("");
  const [link5, setLink5] = useState("");
  const [image6, setImage6] = useState("");
  const [link6, setLink6] = useState("");
  const [image7, setImage7] = useState("");
  const [link7, setLink7] = useState("");
  const [image8, setImage8] = useState("");
  const [link8, setLink8] = useState("");
  const [image9, setImage9] = useState("");
  const [link9, setLink9] = useState("");
  const [image10, setImage10] = useState("");
  const [link10, setLink10] = useState("");
  const navigate = useNavigate();

  const {
    data: banners,
    isLoading: bannerLoading,
    error: bannerError,
    refetch,
  } = useGetBannersQuery();
  const [addBanner, { isLoading }] = useAddBannerMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const uploadFileHandler = async (e, imageField) => {
    const file = e.target.files[0];
    if (file.size > 300000) {
      // 300kb in bytes
      toast.error("Each image must be less than 300KB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      switch (imageField) {
        case "image1":
          setImage1(res.image);
          break;
        case "image2":
          setImage2(res.image);
          break;
        case "image3":
          setImage3(res.image);
          break;
        case "image4":
          setImage4(res.image);
          break;
        case "image5":
          setImage5(res.image);
          break;
        case "image6":
          setImage6(res.image);
          break;
        case "image7":
          setImage7(res.image);
          break;
        case "image8":
          setImage8(res.image);
          break;
        case "image9":
          setImage9(res.image);
          break;
        case "image10":
          setImage10(res.image);
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    try {
      const bannerData = {
        image1,
        link1,
        image2,
        link2,
        image3,
        link3,
        image4,
        link4,
        image5,
        link5,
        image6,
        link6,
        image7,
        link7,
        image8,
        link8,
        image9,
        link9,
        image10,
        link10,
      };
      await addBanner(bannerData).unwrap();
      toast.success("Banner Saved");
      refetch();
      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (banners && banners.length > 0) {
      setImage1(banners[0].image1 || "");
      setLink1(banners[0].link1 || "");

      setImage2(banners[0].image2 || "");
      setLink2(banners[0].link2 || "");

      setImage3(banners[0].image3 || "");
      setLink3(banners[0].link3 || "");

      setImage4(banners[0].image4 || "");
      setLink4(banners[0].link4 || "");

      setImage5(banners[0].image5 || "");
      setLink5(banners[0].link5 || "");

      setImage6(banners[0].image6 || "");
      setLink6(banners[0].link6 || "");

      setImage7(banners[0].image7 || "");
      setLink7(banners[0].link7 || "");

      setImage8(banners[0].image8 || "");
      setLink8(banners[0].link8 || "");

      setImage9(banners[0].image9 || "");
      setLink9(banners[0].link9 || "");

      setImage10(banners[0].image10 || "");
      setLink10(banners[0].link10 || "");
    }
  }, [banners]);

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold">Manage Banners</h2>
      {bannerLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full mt-4">
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={200} />
        </div>
      ) : bannerError ? (
        <p>{bannerError?.data?.meesage}</p>
      ) : (
        <form
          className="w-full px-20 sm:px-1 mt-2"
          onSubmit={handleBannerSubmit}
        >
          {console.log(banners)}
          <p className="text-red-500 font-bold text-center mb-1">
            Image1 , 2 and 3 are required
          </p>
          <div className="bg-gray-100 rounded p-2 w-full mb-1 border border-black">
            <p>Image 1 *</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Image1 URL (Required)"
                value={image1}
                required
                onChange={(e) => setImage1(e.target.value)}
                className="px-2 py-1 border"
              />
              <input
                type="file"
                onChange={(e) => uploadFileHandler(e, "image1")}
              />
              <input
                type="text"
                placeholder="Link Associated with Image1 (required)"
                value={link1}
                required
                onChange={(e) => setLink1(e.target.value)}
                className="px-2 py-1 border mb-0 mt-0"
              />
              {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
            </div>
          </div>

          <div className="bg-gray-100 rounded p-2 w-full mb-1 border border-black">
            <p>Image 2 *</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Image2 URL (Required)"
                value={image2}
                required
                onChange={(e) => setImage2(e.target.value)}
                className="px-2 py-1 border"
              />
              <input
                type="file"
                onChange={(e) => uploadFileHandler(e, "image2")}
              />
              <input
                type="text"
                placeholder="Link Associated with Image2 (required)"
                value={link2}
                required
                onChange={(e) => setLink2(e.target.value)}
                className="px-2 py-1 border"
              />
              {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
            </div>
          </div>

          <div className="bg-gray-100 rounded p-2 w-full mb-1 border border-black">
            <p>Image 3 *</p>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Image3 URL (Required)"
                value={image3}
                required
                onChange={(e) => setImage3(e.target.value)}
                className="px-2 py-1 border  "
              />
              <input
                type="file"
                onChange={(e) => uploadFileHandler(e, "image3")}
              />
              <input
                type="text"
                placeholder="Link Associated with Image3 (required)"
                value={link3}
                required
                onChange={(e) => setLink3(e.target.value)}
                className="px-2 py-1 border  "
              />
              {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
            </div>
          </div>

          {[4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div
              className="bg-gray-100 rounded p-2 w-full mb-1 border border-black"
              key={`image${num}`}
            >
              <p>{`Image ${num}`}</p>
              <div className="flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder={`Image${num} URL`}
                  value={eval(`image${num}`)}
                  onChange={(e) => eval(`setImage${num}(e.target.value)`)}
                  className="px-2 py-1 border"
                />
                <input
                  type="file"
                  onChange={(e) => uploadFileHandler(e, `image${num}`)}
                />
                <input
                  type="text"
                  placeholder={`Link Associated with Image${num}`}
                  value={eval(`link${num}`)}
                  onChange={(e) => eval(`setLink${num}(e.target.value)`)}
                  className="px-2 py-1 border"
                />
                {loadingUpload && (
                  <p className="text-xs font-thin">Loading...</p>
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 px-8 py-2 bg-green-700 text-white font-bold rounded"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminBannerScreen;
