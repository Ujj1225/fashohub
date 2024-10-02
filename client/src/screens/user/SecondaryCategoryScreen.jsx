import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetSecondaryCategoryProductsQuery } from "../../store/slices/productsApiSlice";
import ProductCard from "../../components/ProductCard";
import SkeletonProductCard from "../../components/SkeletonProductCard";
import { Divider, Select } from "@mantine/core";
import { debounce } from "lodash";
import SecondaryCategoriesFilter from "../../components/filters/SecondaryCategoriesFilter";
import PriceRangeFilter from "../../components/filters/PriceRangeFilter";
import DiscountFilter from "../../components/filters/DiscountFilter";
import Footer from "../../components/Footer";

const SecondaryCategoryScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortCriteria, setSortCriteria] = useState(
    searchParams.get("sort") || "recommended"
  );
  const [selectedDiscounts, setSelectedDiscounts] = useState(
    searchParams.get("discounts")?.split(",") || []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(
    searchParams.get("priceRanges")?.split(",") || []
  );

  const { primary, secondary } = useParams();
  const { data, error, isLoading } = useGetSecondaryCategoryProductsQuery({
    primary,
    secondary,
    sort: sortCriteria,
    discounts: selectedDiscounts.join(","),
    priceRanges: selectedPriceRanges.join(","),
  });
  const handleSortChange = useCallback(
    debounce((value) => setSortCriteria(value), 300),
    []
  );
  const handleDiscountChange = useCallback(
    debounce((discounts) => {
      setSelectedDiscounts(discounts);
    }, 300),
    []
  );
  const handlePriceRangeChange = useCallback(
    debounce((priceRanges) => {
      setSelectedPriceRanges(priceRanges);
    }, 300),
    []
  );

  // useEffect(() => {
  //   // reset state i.e filters when primary category changes i.e url are changed
  //   setSortCriteria("recommended");
  //   setSelectedDiscounts([]);
  //   setSelectedPriceRanges([]);
  // }, [secondary]);

  useEffect(() => {
    // clone the searchParams object to modify it
    const newSearchParams = new URLSearchParams();
    // only set parameters if they are not default values
    if (sortCriteria !== "recommended") {
      newSearchParams.set("sort", sortCriteria);
    }
    if (selectedDiscounts.length > 0) {
      newSearchParams.set("discounts", selectedDiscounts.join(","));
    }
    if (selectedPriceRanges.length > 0) {
      newSearchParams.set("priceRanges", selectedPriceRanges.join(","));
    }
    // updating the search parameters if they are not empty
    setSearchParams(newSearchParams);
  }, [sortCriteria, selectedDiscounts, selectedPriceRanges, setSearchParams]);

  return (
    <>
    <div className="pb-4">
      <div className="p-4">
        <Link to="/" className="text-sm font-normal hover:underline">
          HOME
        </Link>
        &nbsp;/&nbsp;
        <Link to={`/${primary}`} className="text-sm hover:underline">
          {primary.replace(/-/g, " ").toUpperCase()}
        </Link>
        &nbsp;/&nbsp;
        <Link
          to={`/${primary}/${secondary}`}
          className="text-sm font-bold hover:underline"
        >
          {secondary.replace(/-/g, " ").toUpperCase()}
        </Link>
        <h2 className="font-bold mt-4">
          {secondary.replace(/-/g, " ").toUpperCase()} -{" "}
          <span className="text-gray-500 font-light mt-4">
            {data && data.length} items
          </span>
        </h2>
        <div className="flex justify-between items-center mt-6">
          <h2 className="font-bold">FILTERS</h2>
          <Select
            data={[
              { value: "recommended", label: "Recommended" },
              { value: "new", label: "What's New" },
              { value: "discount", label: "Better Discount" },
              { value: "rating", label: "Top Rated" },
              { value: "pl2h", label: "Price: Low To High" },
              { value: "ph2l", label: "Price: High To Low" },
            ]}
            defaultValue="recommended"
            allowDeselect={false}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <Divider />
      <div className="flex">
        <div className="w-[15%] sm:hidden">
          <SecondaryCategoriesFilter />
          <Divider my={"lg"} />
          <PriceRangeFilter
            selectedPriceRanges={selectedPriceRanges}
            onPriceRangeChange={handlePriceRangeChange}
          />
          <Divider my={"lg"} />
          <DiscountFilter
            selectedDiscounts={selectedDiscounts}
            onDiscountChange={handleDiscountChange}
          />
          <Divider mt={"lg"} />
        </div>
        <Divider className="h-auto" orientation="vertical" />
        <div className="w-[85%] sm:w-full">
          {isLoading && (
            <div className="grid grid-cols-5 gap-x-10 p-10 gap-y-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:p-3 sm:gap-x-4 xsm:grid-cols-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonProductCard key={index} />
              ))}
            </div>
          )}
          {error && (
            <p className="text-xs font-semibold">
              Error: {error?.data?.message}
            </p>
          )}
          <div>
            {data && data.length > 0 ? (
              <ProductCard product={data} />
            ) : (
              !isLoading && (
                <p className="text-center mt-4 border rounded px-20 font-bold bg-red-300 py-2 w-fit mx-auto mb-2">
                  No products found.
                </p>
              )
            )}
          </div>
          <Divider />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SecondaryCategoryScreen;
