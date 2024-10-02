import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";

const MSearch = ({ handleSearchClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-5 w-full">
      <div className="flex justify-start items-center gap-2 relative font-thin">
        <div onClick={handleSearchClick}>
          <CiSearch className="text-gray-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 cursor-pointer" />
        </div>
        <input
          className="w-full bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search for products, brands and many more"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
            onClick={clearSearch}
          >
            <FaTimes className="text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MSearch;
