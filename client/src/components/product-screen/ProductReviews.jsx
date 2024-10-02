import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProductReviews = ({ product }) => {
  const location = useLocation();
  const inAllReviews = location.pathname.endsWith("all-reviews");

  // const reviewsToShow = product.reviews.slice(0, 3);
  // shows the latest three reviews, ref: https://forum.freecodecamp.org/t/arr-sort-a-b-a-b-explanation/167677
  const reviewsToShow = inAllReviews // if in all-reviews page, then show all reviews by sorting
    ? [...product.reviews].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [...product.reviews]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

  return (
    <div className=" w-full">
      <h2 className="flex items-center gap-2 text-base font-bold">
        Customer Reviews ({product.numReviews})
      </h2>
      {product.numReviews > 0 ? (
        <div className="mt-2">
          {reviewsToShow.map((review) => (
            <div key={review._id}>
              <div className="flex items-baseline gap-x-4 ">
                <div
                  className={`flex items-center gap-x-1 py-0.5 px-1 rounded-sm  text-xs text-white ${
                    review.rating > 3
                      ? "bg-green-500"
                      : review.rating < 3
                      ? "bg-red-600"
                      : "bg-gray-400"
                  }`}
                >
                  {review.rating}
                  <FaStar />
                </div>
                <div className=" flex flex-col gap-y-2">
                  <p
                    className={`font-light ${
                      inAllReviews ? "line-clamp-none" : "line-clamp-2"
                    }`}
                  >
                    {review.comment}
                  </p>
                  <p className="text-gray-600 text-sm flex gap-x-3">
                    <span>{review.name}</span> |
                    <span>{review.createdAt.slice(0, 10)}</span>
                  </p>
                </div>
              </div>
              <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>
            </div>
          ))}
          {product.numReviews > 3 && !inAllReviews && (
            <Link
              to={`/product/${product._id}/all-reviews`}
              className="text-sm text-[#FF3E6B] font-bold"
            >
              Show all {product.numReviews} reviews{" "}
            </Link>
          )}
        </div>
      ) : (
        <p className="text-sm font-bold">No Reviews Available</p>
      )}
    </div>
  );
};

export default ProductReviews;
