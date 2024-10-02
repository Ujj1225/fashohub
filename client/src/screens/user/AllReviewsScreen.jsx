import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../store/slices/productsApiSlice";
import { Skeleton } from "@mantine/core";
import ProductRating from "../../components/product-screen/ProductRating";
import ProductReviews from "../../components/product-screen/ProductReviews";

const AllReviewsScreen = () => {
  const { pid } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(pid);
  return (
    <div className="p-10 md:p-4 sm:p-2">
      {isLoading ? (
        <div className="flex flex-col gap-y-4">
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      ) : error ? (
        <p>{error.data.message}</p>
      ) : (
        <div className="flex gap-x-6 sm:flex-col">
          <div>
            <img
              src={product.image1}
              alt="img"
              className="h-[500px] w-[450px] md:h-[400px] sm:w-[350px] sm:mx-auto"
            />
            <p className="font-bold text-2xl leading-6 md:text-xl mt-2 sm:text-center">
              {product.brand}
            </p>
            <p className="text-gray-500 font-light text-xl mt-1 md:text-lg sm:text-center">
              {product.name}
            </p>
            <div className="flex items-center mt-1 sm:w-fit sm:mx-auto">
              <p className="text-2xl font-bold leading-6 md:text-xl ">
                रु {product.sellingPrice}
              </p>
              <p className="text-xl leading-6 font-light ml-3 text-gray-600 md:text-lg">
                MRP
                <span className="line-through ml-1">
                  रु{product.actualPrice}
                </span>
              </p>
              <p className="ml-3 font-bold text-xl text-orange-400 md:text-lg">
                ({product.off}% OFF)
              </p>
            </div>
          </div>
          <div className="w-full sm:mt-4 ">
            <ProductRating product={product} />
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />
            <ProductReviews product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviewsScreen;
