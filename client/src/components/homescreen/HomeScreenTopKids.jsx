import React from "react";
import { useGetPrimaryCategoryProductsQuery } from "../../store/slices/productsApiSlice";
import { Carousel } from "@mantine/carousel";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Skeleton } from "@mantine/core";

const HomeScreenTopKids = () => {
  const { data, isLoading, error } = useGetPrimaryCategoryProductsQuery({
    primary: "kids",
    sort: "rating",
  });
  return (
    <div className="mt-10 sm:mt-4 xsm:mt-2">
      <h2 className="font-bold text-gray-600 text-xl mb-4">
        Top Products For Kids
      </h2>
      {isLoading ? (
        <div className="flex gap-x-10 overflow-hidden">
          <Skeleton height={350} width={250} />
          <Skeleton height={350} width={250} />
          <Skeleton height={350} width={250} className="xsm:hidden" />
          <Skeleton height={350} width={250} className="xsm:hidden" />
          <Skeleton height={350} width={250} className="sm:hidden" />
          <Skeleton height={350} width={250} className="md:hidden" />
        </div>
      ) : error ? (
        <p>Error occured.</p>
      ) : (
        <>
          {data && data.length > 0 ? (
            <Carousel
              withIndicators={false}
              // slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
              // slideGap={{ base: 0, sm: "md" }}
              slideSize="0%"
              slideGap="xs"
              loop
              align="start"
            >
              {data.map((item) => (
                <Carousel.Slide
                  key={item._id}
                  className="flex flex-col items-center"
                >
                  <Link
                    to={`/product/${item._id}`}
                    className="relative h-full hover:shadow-xl border-b border-b-transparent hover:border-b-gray-200 shadow-black cursor-pointer"
                  >
                    <img
                      src={item.image1}
                      alt="img1"
                      className="h-[280px] w-[210px]"
                    />
                    <div className="absolute bottom-24 left-2 md:flex md:items-center md:justify-between md:w-[180px]">
                      {item.numReviews > 0 && (
                        <p
                          className={`flex gap-x-1 bg-gray-200 p-1 rounded-sm text-xs font-bold `}
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
                    <div className="p-2 w-[210px]">
                      <div>
                        <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
                          {item.brand}
                        </p>
                        <p className="text-ellipsis whitespace-nowrap overflow-hidden font-extralight text-sm text-gray-700">
                          {item.name}
                        </p>
                      </div>

                      <p className="text-sm font-semibold mt-1">
                        Rs. {item.sellingPrice}{" "}
                        <span className="line-through text-[11px] font-medium text-gray-500">
                          Rs. {item.actualPrice}
                        </span>
                        <span className="text-orange-600 text-[11px] font-normal">
                          &nbsp;({item.off}% OFF)
                        </span>
                      </p>
                    </div>
                  </Link>
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <>
              {
                <p className="text-center mt-4 border rounded px-20 font-bold bg-red-300 py-2 w-fit mx-auto mb-2">
                  No products found.
                </p>
              }
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomeScreenTopKids;
