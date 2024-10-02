import React, { useState } from "react";
import { useGetProductByIdQuery } from "../store/slices/productsApiSlice";
import { useRemoveFromBagMutation } from "../store/slices/bagApiSlice";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BagProductDetails = ({ product, refetch }) => {
  // const [isChecked, setIsChecked] = useState(true);

  // const handleCheckboxClick = () => {
  //   setIsChecked(!isChecked);
  // };

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetProductByIdQuery(product.product); // product.product => id of the product

  const [removeFromBag] = useRemoveFromBagMutation();

  const handleRemoveBagItem = async (pid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove the item from bag?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
      width: "300px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await removeFromBag(pid).unwrap();
          toast.success(res.message);
          refetch();
        } catch (error) {
          toast.error(error?.data?.message || error?.error);
        }
      }
    });
  };

  return (
    <>
      {productLoading ? (
        <div className="font-bold">Loading...</div>
      ) : productError ? (
        <p className="text-xl font-bold text-center mt-4">
          {productError.data.message}
        </p>
      ) : (
        <div className="flex items-center p-2 border rounded shadow-sm relative sm:p-1">
          <Link
            to={`/product/${product.product}`}
            className="w-28 h-28 sm:w-24 sm:h-24"
          >
            <img
              src={productData.image1}
              alt="img"
              className="w-full h-full hover:cursor-pointer"
            />
          </Link>
          <div className="ml-4 w-full sm:ml-2">
            <p className="font-bold sm:text-sm">{productData.brand}</p>
            <Link to={`/product/${product.product}`}>
              <p className="font-light line-clamp-1 sm:text-sm w-fit cursor-pointer hover:font-normal">
                {productData.name}
              </p>
            </Link>
            <p className="text-sm font-light text-gray-400 sm:text-xs">
              Sold by: {productData.seller}
            </p>
            <div className="flex items-center gap-x-4 mt-2 sm:gap-x-2">
              <p className="px-1 py-0.5 bg-gray-200 rounded-sm font-bold text-sm sm:text-xs">
                Size: {product.size.toUpperCase()}
              </p>
              <p className="px-1 py-0.5 bg-gray-200 rounded-sm font-bold text-sm sm:text-xs">
                Qty: {product.quantity}
              </p>
            </div>
            <div className="flex gap-x-2 items-center text-sm mt-2">
              <span className="font-bold">रु {productData.sellingPrice}</span>
              <span className="line-through text-gray-500">
                रु {productData.actualPrice}
              </span>
              <span className="text-orange-400">{productData.off}% OFF</span>
            </div>
          </div>
          <RxCross2
            className="absolute top-2 right-2 text-gray-500 cursor-pointer sm:top-1 sm:right-1"
            size={25}
            onClick={() => handleRemoveBagItem(product.product)} // or productData._id
          />
          {/* <input
            type="checkbox"
            checked={isChecked}
            className="custom-checkbox absolute top-4 w-4 h-4 appearance-none bg-white border border-[#4a5568] rounded-sm checked:bg-[#FF3E6B] checked:border-[#FF3E6B]"
            onClick={handleCheckboxClick}
          /> */}
        </div>
      )}
    </>
  );
};

export default BagProductDetails;
