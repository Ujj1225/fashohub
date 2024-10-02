import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";

const SecondaryCategoriesFilter = () => {
  const { primary, secondary } = useParams();
  const navigate = useNavigate();

  // function to format primary category parameter
  const formatPrimary = (str) => {
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedPrimary = formatPrimary(primary);
  const secondaryCategories = Object.keys(
    categoriesData[formattedPrimary] || {}
  );

  const handleCategoryChange = (e) => {
    const subCategory = e.target.value;
    navigate(`/${primary}/${subCategory.replace(/ /g, "-").toLowerCase()}`);
  };

  return (
    <div className="flex flex-col space-y-2 mt-4 gap-y-1 px-4">
      {secondaryCategories.map((subCategory) => (
        <label key={subCategory} className="flex items-center space-x-2">
          <input
            type="radio"
            name="subcategory"
            value={subCategory}
            checked={
              secondary.toLowerCase() ===
              subCategory.replace(/ /g, "-").toLowerCase()
            }
            onChange={handleCategoryChange}
            className="form-radio text-blue-500"
          />
          <span className="text-sm font-bold">{subCategory}</span>
        </label>
      ))}
    </div>
  );
};

export default SecondaryCategoriesFilter;
