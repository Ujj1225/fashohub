import React, { useCallback, useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddWishlistMutation,
  // useGetWishlistItemByIdQuery,
} from "../store/slices/wishlistApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const ProductCard = React.memo(({ product }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [addWishlist, { isLoading }] = useAddWishlistMutation();

  // const {
  //   data: wishlistItem,
  //   isLoading: wishlistLoading,
  //   error: wishlistError,
  //   refetch,
  // } = useGetWishlistItemByIdQuery(product?._id, { skip: !product?._id });

  const handleWishlistClick = async (e, productId) => {
    e.preventDefault();
    if (!userInfo) {
      navigate(`/login?redirect=/product/${productId}`);
      return;
    }
    try {
      const res = await addWishlist(productId).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const isLargeScreen = () => window.innerWidth > 1105;

  const handleMouseEnter = useCallback((id) => {
    if (isLargeScreen()) setHoveredIndex(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isLargeScreen()) setHoveredIndex(null);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-y-8 p-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:p-3 sm:gap-x-4 xsm:grid-cols-1">
      {product.map((item) => (
        <Link to={`/product/${item._id}`} key={item._id}>
          <div
            onMouseEnter={() => handleMouseEnter(item._id)}
            onMouseLeave={handleMouseLeave}
            className="hover:shadow-md w-[210px] mx-auto hover:cursor-pointer h-[360px] lg:h-auto pb-2"
          >
            <div className="relative -z-10">
              <div className="h-[280px] w-[210px]">
                {hoveredIndex === item._id ? (
                  <div>
                    <ProductCarousel
                      images={Object.keys(item)
                        .filter((key) => key.startsWith("image") && item[key])
                        .map((key) => item[key])}
                    />
                  </div>
                ) : (
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="absolute bottom-3 left-3 md:flex md:items-center md:justify-between md:w-[180px]">
                {item.numReviews > 0 && (
                  <p
                    className={`flex gap-x-1 bg-gray-200 p-1 rounded-sm text-xs font-bold ${
                      hoveredIndex == item._id ? "hidden md:block" : "block"
                    }`}
                  >
                    <span className="flex items-center gap-x-1">
                      {item.rating.toFixed(1)}{" "}
                      <FaStar
                        color={
                          item.rating > 3
                            ? "orange"
                            : item.rating < 3
                            ? "red"
                            : "gray"
                        }
                      />{" "}
                    </span>{" "}
                    |{" "}
                    <span>
                      {item.numReviews >= 1000 ? (
                        <>{item.numReviews / 1000 + "K"}</>
                      ) : (
                        <>{item.numReviews}</>
                      )}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="p-2 w-[210px]">
              {hoveredIndex === item._id ? (
                <div className="-mt-8">
                  <button
                    className="w-full border rounded-sm text-sm py-1 flex justify-center items-center gap-1 border-gray-300 hover:border-black"
                    onClick={(e) => handleWishlistClick(e, item._id)}
                  >
                    <CiHeart size={20} />
                    <span className="text-sm font-bold">
                      {isLoading ? "Adding..." : "WISHLIST"}
                    </span>
                  </button>
                  <p className="text-ellipsis whitespace-nowrap overflow-hidden text-sm font-light mt-2 md:mt-4">
                    {item.sizes.length === 1 ? (
                      <span>Size: {item.sizes[0].size.toUpperCase()}</span>
                    ) : item.sizes.length !== 0 ? (
                      <span>
                        Sizes: {item.sizes[0].size.toUpperCase()}
                        {item.sizes.length > 1 && (
                          <span className="text-gray-500 text-xs font-thin">
                            , more sizes available
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>Seller: {item.seller}</span>
                    )}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
                    {item.brand}
                  </p>
                  <p className="text-ellipsis whitespace-nowrap overflow-hidden font-extralight text-sm text-gray-700">
                    {item.name}
                  </p>
                </div>
              )}

              <p className="text-sm font-semibold mt-1">
                Rs. {item.sellingPrice}{" "}
                <span className="line-through text-[11px] font-medium text-gray-500">
                  Rs. {item.actualPrice}
                </span>
                <span className="text-orange-600 text-[11px] font-normal">
                  &nbsp;({item.off}% OFF)
                </span>
              </p>
              <button
                className="w-full border rounded-sm text-sm py-1 mt-2 hidden lg:flex justify-center items-center gap-1 border-gray-300"
                onClick={(e) => handleWishlistClick(e, item._id)}
              >
                <CiHeart size={20} />
                <span className="text-sm font-bold">
                  {isLoading ? "Adding..." : "WISHLIST"}
                </span>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
});

export default ProductCard;
