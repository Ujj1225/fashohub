import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../store/slices/productsApiSlice";
import TextAreaComponent from "../../components/copilotkit/textArea";

const VendorCreateProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [off, setOff] = useState("");
  const [seller, setSeller] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");
  const [tertiaryCategory, setTertiaryCategory] = useState("");
  const [sizes, setSizes] = useState([{ size: "", quantity: "" }]);

  const navigate = useNavigate();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", quantity: "" }]);
  };

  const handleSizeChange = (index, key, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][key] = value;
    setSizes(updatedSizes);
  };
  const handleRemoveSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
  };

  const handlePrimaryChange = (e) => {
    setPrimaryCategory(e.target.value);
    setSecondaryCategory("");
    setTertiaryCategory("");
  };

  const handleSecondaryChange = (e) => {
    setSecondaryCategory(e.target.value);
    setTertiaryCategory("");
  };

  const handleTertiaryChange = (e) => {
    setTertiaryCategory(e.target.value);
  };
  const getSecondaryOptions = () => {
    if (primaryCategory) {
      return Object.keys(categoriesData[primaryCategory]);
    }
    return [];
  };

  const getTertiaryOptions = () => {
    if (primaryCategory && secondaryCategory) {
      return categoriesData[primaryCategory][secondaryCategory];
    }
    return [];
  };

  const handleProductCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        brand,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        primaryCategory,
        secondaryCategory,
        tertiaryCategory,
        description,
        sellingPrice,
        actualPrice,
        off,
        sizes,
        seller,
      };
      await createProduct(productData).unwrap();
      toast.success("Product Created");
      navigate("/vendor");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const uploadFileHandler = async (e, imageField) => {
    const file = e.target.files[0];
    if (file.size > 200000) {
      // 200kb in bytes
      toast.error("Each image must be less than 200KB");
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
        default:
          break;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full md:px-2">
      <h2 className="text-xl font-semibold">Create A New Product</h2>
      {loadingCreate && (
        <p className="text-xs font-thin">Creating a new product...</p>
      )}
      <form
        className="bg-gray-50 px-4 py-6 mt-4 rounded-lg shadow-lg w-2/3 md:px-2 md:w-full"
        onSubmit={handleProductCreate}
      >
        <div className="mt-4 mb-2">
          <p>
            Product Name <span className="text-red-600 font-extrabold">*</span>
          </p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter product name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={"100"}
          />
        </div>
        <div className="mb-2">
          <p>
            Product Brand <span className="text-red-600 font-extrabold">*</span>
          </p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter product brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            maxLength={"30"}
          />
        </div>
        <div className="mb-2">
          <p>
            Images<span className="text-red-600 font-extrabold">*</span>
            <span className="ml-1 text-xs font-light italic">
              Atleast 1, atmost 6. Each image shall be maximum of 200kb
            </span>
          </p>
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Image1 URL (Required)"
              value={image1}
              required
              onChange={(e) => setImage1(e.target.value)}
              className="px-2 py-1 border mb-0 mt-4"
              disabled
            />
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, "image1")}
            />
            {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Image2 URL (Optional)"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              className="px-2 py-1 border mb-0 mt-4"
              disabled
            />
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, "image2")}
            />
            {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Image3 URL (Optional)"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              className="px-2 py-1 border mb-0 mt-4"
              disabled
            />
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, "image3")}
            />
            {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Image4 URL (Optional)"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
              className="px-2 py-1 border mb-0 mt-4"
              disabled
            />
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, "image4")}
            />
            {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Image5 URL (Optional)"
              value={image5}
              onChange={(e) => setImage5(e.target.value)}
              className="px-2 py-1 border mb-0 mt-4"
              disabled
            />
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, "image5")}
            />
            {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Image6 URL (Optional)"
              value={image6}
              onChange={(e) => setImage6(e.target.value)}
              className="px-2 py-1 border mb-0 mt-4"
              disabled
            />
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, "image6")}
            />
            {loadingUpload && <p className="text-xs font-thin">Loading...</p>}
          </div>
        </div>
        <div className="mb-2">
          <p>
            Primary Category{" "}
            <span className="text-red-600 font-extrabold">*</span>
          </p>
          <select
            className="border border-gray-400 rounded-sm w-full p-1"
            value={primaryCategory}
            onChange={handlePrimaryChange}
            required
          >
            <option value="">Select Primary Category</option>
            {Object.keys(categoriesData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <p>
            Secondary Category
            <span className="text-red-600 font-extrabold">*</span>
          </p>
          <select
            className="border border-gray-400 rounded-sm w-full p-1"
            value={secondaryCategory}
            onChange={handleSecondaryChange}
            required
          >
            <option value="">Select Secondary Category</option>
            {getSecondaryOptions().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <p>
            Tertiary Category{" "}
            <span className="text-red-600 font-extrabold">*</span>
          </p>
          <select
            className="border border-gray-400 rounded-sm w-full p-1"
            value={tertiaryCategory}
            onChange={handleTertiaryChange}
            required
          >
            <option value="">Select Tertiary Category</option>
            {getTertiaryOptions().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <p>
            Product Description{" "}
            <span className="text-red-600 font-extrabold">*</span>
            <span className="ml-1 text-xs font-light italic">
              You can use # for a title, and -- for bullet points
            </span>
          </p>
          {/* <textarea
            rows="4"
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter product description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            maxLength={"2000"}
          /> */}
          <TextAreaComponent
            value={description}
            onDescriptionChange={handleDescriptionChange}
          />
        </div>
        <div className="mb-2">
          <p>
            Selling Price (in Rs){" "}
            <span className="text-red-600 font-extrabold">*</span>
          </p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter selling price"
            required
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            maxLength={"6"}
          />
        </div>
        <div className="mb-2">
          <p>
            Actual Price (in Rs){" "}
            <span className="text-red-600 font-extrabold">*</span>
          </p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter actual price"
            required
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)}
            maxLength={"6"}
          />
        </div>
        <div className="mb-2">
          <p>
            Discount Percentage
            <span className="text-red-600 font-extrabold">*</span>
            <span className="ml-1 text-xs font-light italic">
              Enter simply 25 for 25%
            </span>
          </p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter discount percentage"
            required
            value={off}
            onChange={(e) => setOff(e.target.value)}
            maxLength={"2"}
          />
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <p>Sizes</p>
            <button
              type="button"
              className="bg-blue-700 px-2 py-0.5 ml-4 rounded-full hover:bg-blue-600 text-white font-bold mt-2"
              onClick={handleAddSize}
            >
              + Add Field
            </button>
          </div>
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                className="border border-gray-400 rounded-sm w-1/2 p-1 mr-2"
                placeholder="Size"
                value={size.size}
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                maxLength={"4"}
              />
              <input
                type="number"
                className="border border-gray-400 rounded-sm w-1/4 p-1 mr-2"
                placeholder="Quantity"
                value={size.quantity}
                onChange={(e) =>
                  handleSizeChange(index, "quantity", e.target.value)
                }
                maxLength={"4"}
              />
              <button
                type="button"
                className="bg-red-600 px-3 py-0.5 rounded-full hover:bg-red-500 text-white font-bold"
                onClick={() => handleRemoveSize(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <p>
            Shop Name
            <span className="text-red-600 font-extrabold">*</span>
          </p>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full p-1"
            placeholder="Enter your shop name"
            required
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            maxLength={"50"}
          />
        </div>
        <button className="bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-600 text-white font-bold">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default VendorCreateProduct;
