import React from "react";
import { IoMdStar } from "react-icons/io";

const ProductDetails = ({ product }) => {
  return (
    <>
      <p className="font-bold text-2xl leading-6 md:text-xl">{product.brand}</p>
      <p className="text-gray-500 font-light text-xl mt-1 md:text-lg">
        {product.name}
      </p>
      {product.numReviews > 0 && (
        <a href="#ratings_reviews">
          <div className="flex gap-1 border w-fit px-2 py-1 mt-2 rounded-sm text-base cursor-pointer hover:border-black">
            <span className="flex items-center gap-1 font-bold">
              {product.rating.toFixed(1)} <IoMdStar color="grey" size={20} />
            </span>
            |
            <span className="font-light text-gray-600">
              {product.numReviews >= 1000 ? (
                <>{product.numReviews / 1000 + "K"}</>
              ) : (
                <>{product.numReviews}</>
              )}
            </span>
          </div>
        </a>
      )}
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>
      <div className="flex items-center">
        <p className="text-2xl font-bold leading-6 md:text-xl">
          रु {product.sellingPrice}
        </p>
        <p className="text-xl leading-6 font-light ml-3 text-gray-600 md:text-lg">
          MRP
          <span className="line-through ml-1">रु{product.actualPrice}</span>
        </p>
        <p className="ml-3 font-bold text-xl text-orange-400 md:text-lg">
          ({product.off}% OFF)
        </p>
      </div>
    </>
  );
};

export default ProductDetails;
