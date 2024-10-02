import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";

const PrimaryCategoriesFilter = () => {
  const { primary, secondary, tertiary } = useParams();

  const navigate = useNavigate();

  const formatCategoryName = (str) => {
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const formattedPrimary = formatCategoryName(primary);
  const formattedSecondary = formatCategoryName(secondary);
  const tertiaryCategories =
    categoriesData[formattedPrimary]?.[formattedSecondary] || [];

  const handleCategoryChange = (e) => {
    const tertiaryCategory = e.target.value;
    navigate(
      `/${primary}/${secondary}/${tertiaryCategory
        .replace(/ /g, "-")
        .toLowerCase()}`
    );
  };

  return (
    <div className="flex flex-col space-y-2 mt-4 gap-y-1 px-4">
      {tertiaryCategories.map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="radio"
            name="primarycategory"
            value={category}
            onChange={handleCategoryChange}
            className="form-radio text-blue-500"
            checked={
              tertiary.toLowerCase() ===
              category.replace(/ /g, "-").toLowerCase()
            }
          />
          <span className="text-sm font-bold">{category}</span>
        </label>
      ))}
    </div>
  );
};

export default PrimaryCategoriesFilter;
