import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";

const Navlinks = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const categories = Object.keys(categoriesData);

  const handleMouseEnter = (category) => {
    setOpenCategory(category);
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
  };

  const handleCategoryClick = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <>
      {categories.map((category) => (
        <div
          key={category}
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
          className="relative group"
        >
          <div className="px-1 text-left">
            <Link
              to={`/${category.replace(/\s+/g, "-").toLowerCase()}`}
              className="desktop-main pl-3 pr-3 py-2 flex justify-between border-b-0 group-hover:border-b-4 group-hover:border-[#ee5f73] transition-all duration-200 ease-out cursor-pointer text-sm font-bold"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Link>
            {openCategory === category && categoriesData[category] && (
              <div
                className="absolute top-full left-0 bg-white shadow-lg p-5 grid grid-cols-3 gap-4 z-50"
                style={{ width: "40rem" }}
              >
                {Object.keys(categoriesData[category]).map((subCategory) => (
                  <div key={subCategory}>
                    <Link
                      to={`/${category
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${subCategory
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      <p className="text-base font-semibold text-red-600 mb-2">
                        {subCategory}
                      </p>
                    </Link>
                    <ul className="space-y-1">
                      {categoriesData[category][subCategory].map(
                        (item, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 hover:font-bold"
                          >
                            <Link
                              to={`/${category
                                .replace(/\s+/g, "-")
                                .toLowerCase()}/${subCategory
                                .replace(/\s+/g, "-")
                                .toLowerCase()}/${item
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              className="hover:text-gray-800"
                            >
                              {item}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Navlinks;
