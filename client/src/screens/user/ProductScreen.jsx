import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../../store/slices/productsApiSlice";
import { HiShoppingBag } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import ProductScreenHeader from "../../components/product-screen/ProductScreenHeader.jsx";
import {
  useAddWishlistMutation,
  useGetWishlistItemByIdQuery,
} from "../../store/slices/wishlistApiSlice.js";
import { useAddToBagMutation } from "../../store/slices/bagApiSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProductScreenImages from "../../components/product-screen/ProductScreenImages.jsx";
import ProductRating from "../../components/product-screen/ProductRating.jsx";
import ProductSeller from "../../components/product-screen/ProductSeller.jsx";
import ProductReviews from "../../components/product-screen/ProductReviews.jsx";
import ProductDescription from "../../components/product-screen/ProductDescription.jsx";
import ProductWriteReview from "../../components/product-screen/ProductWriteReview.jsx";
import ProductDetails from "../../components/product-screen/ProductDetails.jsx";
import ProductRecommendations from "../../components/copilotkit/copilotTask.jsx";

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addToBag, { isLoading: addToBagLoading }] = useAddToBagMutation();
  const [outOfStock, setOutOfStock] = useState(false);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProductByIdQuery(id);
  const [addWishlist, { isLoading }] = useAddWishlistMutation();
  const { data: wishlistItem, refetch } = useGetWishlistItemByIdQuery(
    product?._id,
    { skip: !product?._id }
  );

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(1);
  };

  const handleWishlistClick = async (productId) => {
    if (!userInfo) {
      navigate(`/login?redirect=/product/${productId}`);
      return;
    }
    try {
      const res = await addWishlist(productId).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleAddToBagClick = async (pid) => {
    if (!userInfo) {
      navigate(`/login?redirect=/product/${pid}`);
      return;
    }
    if (product.sizes.filter((item) => item.size).length > 0 && !selectedSize) {
      toast.error("Please select a size before adding to the bag.");
      return;
    }
    try {
      const res = await addToBag({
        pid,
        size: selectedSize,
        quantity: selectedQuantity,
      }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  useEffect(() => {
    if (product && product.sizes.filter((item) => item.size).length === 0) {
      setOutOfStock(true);
    } else {
      setOutOfStock(false);
    }
  }, [product]);

  return (
    <div>
      {productLoading ? (
        <p className="text-sm font-bold text-center mt-4">
          Loading Product Details...
        </p>
      ) : productError ? (
        <p className="text-sm font-bold text-center mt-4">
          Error loading product: {productError?.data?.message}
        </p>
      ) : (
        <div className="p-4 sm:p-2">
          <ProductScreenHeader product={product} />
          <div className="flex items-start justify-center sm:flex-col">
            <ProductScreenImages product={product} />
            <div
              className={`px-4 sm:px-0 sm:w-full sm:mt-4 ${
                product.image2 ? "w-2/5 lg:w-1/2" : "w-[70%]"
              }`}
            >
              <ProductDetails product={product} />

              {product.sizes.filter((item) => item.size).length > 0 && (
                <div className="mt-4">
                  <h2 className="font-bold text-base">SELECT SIZE</h2>
                  <div className="grid grid-cols-8 w-fit gap-2 mt-2 md:grid-cols-4 sm:grid-cols-5">
                    {product.sizes
                      .filter((item) => item.size)
                      .map((item, index) => (
                        <div key={index}>
                          <button
                            className={`border rounded-full w-12 h-12 flex items-center justify-center ${
                              selectedSize === item.size
                                ? "border-black bg-gray-100"
                                : "border-gray-300 bg-gray-50"
                            }`}
                            onClick={() => handleSizeClick(item.size)}
                          >
                            {item.size.toUpperCase()}
                          </button>
                        </div>
                      ))}
                  </div>
                  {selectedSize && (
                    <div className="mt-4">
                      <h2 className="font-bold text-base">SELECT QUANTITY</h2>
                      <select
                        value={selectedQuantity}
                        onChange={(e) =>
                          setSelectedQuantity(Number(e.target.value))
                        }
                        className="mt-2 border border-gray-300 rounded-md w-20 h-8 text-center"
                      >
                        {[
                          ...Array(
                            product.sizes.find(
                              (item) => item.size === selectedSize
                            )?.quantity
                          ).keys(),
                        ].map((q) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
              {outOfStock && (
                <p className="my-8 border w-fit p-2 rounded bg-red-600 text-white font-bold">
                  Product is Out of Stock
                </p>
              )}
              <div className="mt-4 flex items-center gap-2 sm:justify-around">
                <button
                  className="flex items-center gap-2 px-20 py-4 bg-[#FF3E6B] text-white font-bold text-base rounded-md hover:bg-[#f46486] xl:px-10 md:px-4 md:py-2 sm:text-sm sm:px-3 sm:py-1.5"
                  onClick={() => handleAddToBagClick(product._id)}
                  disabled={outOfStock}
                >
                  <HiShoppingBag size={25} className="sm:size-6" />{" "}
                  {addToBagLoading ? "Adding to bag..." : "ADD TO BAG"}
                </button>
                <button
                  className={`flex items-center gap-2 px-10 py-4 font-bold text-base rounded-md border md:px-4 md:py-2 sm:text-sm sm:px-3 sm:py-1.5 ${
                    wishlistItem &&
                    wishlistItem.length > 0 &&
                    wishlistItem[0].product === product._id
                      ? "border-red-500 hover:border-red-300"
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => handleWishlistClick(product._id)}
                >
                  {wishlistItem &&
                  wishlistItem.length > 0 &&
                  wishlistItem[0].product === product._id ? (
                    <IoMdHeart size={25} className="sm:size-6" color="red" />
                  ) : (
                    <CiHeart size={25} className="sm:size-6" />
                  )}

                  {isLoading ? "Adding..." : "WISHLIST"}
                </button>
              </div>
              <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <ProductDescription product={product} />
              <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <ProductRating product={product} />
              <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <ProductReviews product={product} />
              {userInfo && (
                <ProductWriteReview
                  productId={product._id}
                  productRefetch={productRefetch}
                />
              )}
              <ProductSeller product={product} />
            </div>
          </div>
        </div>
      )}
      {/* <ProductRecommendations /> */}
    </div>
  );
};

export default ProductScreen;
