import React from "react";

const PriceRangeFilter = ({ selectedPriceRanges, onPriceRangeChange }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onPriceRangeChange([...selectedPriceRanges, value]);
    } else {
      onPriceRangeChange(
        selectedPriceRanges.filter((range) => range !== value)
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2 mt-4 gap-y-1 px-4">
      <p className="text-sm font-bold">PRICE</p>
      {["<500", "500-1000", "1000-2000", "2000-4000", "4000-6000", ">6000"].map(
        (range) => (
          <label key={range} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={range}
              checked={selectedPriceRanges.includes(range)}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-500"
            />
            <span className="text-sm">Rs. {range}</span>
          </label>
        )
      )}
    </div>
  );
};

export default PriceRangeFilter;
