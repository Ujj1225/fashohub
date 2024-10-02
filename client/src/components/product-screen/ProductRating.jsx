import { Divider, Progress } from "@mantine/core";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const ProductRating = ({ product }) => {
  const calculateValue = (particularRating) => {
    const value = (particularRating / product.numReviews) * 100;
    return value;
  };

  const reviewBreakdown = product.reviews.reduce((acc, review) => {
    const { rating } = review;
    if (!acc[rating]) {
      acc[rating] = 0;
    }
    acc[rating]++;
    return acc;
  }, {});

  return (
    <div id="ratings_reviews" className="">
      <h2 className="flex items-center gap-2 text-base font-bold">
        RATINGS <CiStar size={20} />
      </h2>
      {product.numReviews > 0 ? (
        <div className="flex items-center gap-x-4 py-2 sm:gap-x-2">
          <span className="flex items-center text-6xl sm:text-4xl">
            {product.rating.toFixed(1)}{" "}
            <FaStar size={30} className="ml-1" color="#FF3E6B" />{" "}
          </span>
          <Divider orientation="vertical" className="h-28" />
          <div>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-x-2 mb-0">
                <span className="flex items-center gap-x-1 text-[#BDBDBD] text-sm">
                  {star} <FaStar color="#BDBDBD" />
                </span>
                <Progress
                  style={{
                    height: "4px",
                  }}
                  color={
                    star === 5
                      ? "green"
                      : star === 4
                      ? "yellow"
                      : star === 3
                      ? "orange"
                      : star === 2
                      ? "gray"
                      : "red"
                  }
                  value={calculateValue(reviewBreakdown[star] || 0)}
                  className="w-80 md:w-56 sm:w-36"
                />
                <p className="text-sm">{reviewBreakdown[star] || 0}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm font-bold">Not Rated</p>
      )}
    </div>
  );
};

export default ProductRating;
