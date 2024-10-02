import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";

const PrimaryCategoriesFilter = () => {
  const { primary } = useParams();
  const navigate = useNavigate();

  const primaryCategories = Object.keys(categoriesData);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    navigate(`/${category.replace(/ /g, "-").toLowerCase()}`);
  };

  return (
    <div className="flex flex-col space-y-2 mt-4 gap-y-1 px-4">
      {primaryCategories.map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="radio"
            name="category"
            value={category}
            checked={
              primary.toLowerCase() ===
              category.replace(/ /g, "-").toLowerCase()
            }
            onChange={handleCategoryChange}
            className="form-radio text-blue-500"
          />
          <span className="font-bold text-sm">{category}</span>
        </label>
      ))}
    </div>
  );
};

export default PrimaryCategoriesFilter;
