import React from "react";
import { Link } from "react-router-dom";
import { useGetWishlistQuery } from "../../store/slices/wishlistApiSlice";
import { RxCross1 } from "react-icons/rx";
import { useRemoveWishlistMutation } from "../../store/slices/wishlistApiSlice";
import { toast } from "react-toastify";
import SkeletonProductCard from "../../components/SkeletonProductCard";
import Swal from "sweetalert2";

const WishlistScreen = () => {
  const {
    data: wishlistItems,
    isLoading: wishlistLoading,
    error: wishlistError,
    refetch,
  } = useGetWishlistQuery();

  const [removeWishlist] = useRemoveWishlistMutation();

  const handleWishlistDelete = async (wid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove the item from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
      width: "300px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await removeWishlist(wid).unwrap();
          toast.success(res.message);
          refetch();
        } catch (error) {
          toast.error(error?.data?.message || error?.error);
        }
      }
    });
  };

  return (
    <div>
      {wishlistLoading ? (
        <div className="grid grid-cols-5 gap-4 p-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 mx-auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </div>
      ) : wishlistError ? (
        <p className="text-xl font-bold text-center mt-4">
          {wishlistError.data.message}
        </p>
      ) : (
        <div className="grid grid-cols-5 gap-4 p-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 mx-auto">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="h-[400px] w-[210px] border lg:w-[200px] mx-auto"
            >
              <div className="h-[280px] w-full bg-red-800 mx-auto relative">
                <img
                  src={item.product.image1}
                  alt="image1"
                  className="h-full w-full"
                />
                <RxCross1
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-400 cursor-pointer hover:bg-gray-500"
                  size={25}
                  onClick={() => handleWishlistDelete(item._id)}
                />
              </div>
              <p className="px-2 py-1 whitespace-nowrap overflow-hidden text-ellipsis text-center font-medium">
                {item.product.name}
              </p>
              <p className="font-bold text-base mt-1 text-center ">
                Rs. {item.product.sellingPrice}&nbsp;&nbsp;
                <span className="line-through text-sm text-gray-500 font-normal">
                  Rs. {item.product.actualPrice}
                </span>
                <span className="text-red-400 text-sm">
                  &nbsp;&nbsp;({item.product.off}% OFF)
                </span>
              </p>
              <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
              <Link to={`/product/${item.product._id}`}>
                <button className="mx-auto block font-bold text-lg text-red-500 cursor-pointer hover:text-red-600">
                  VIEW PRODUCT
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default WishlistScreen;
