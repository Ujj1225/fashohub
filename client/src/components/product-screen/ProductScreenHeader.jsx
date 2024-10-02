import React from "react";
import { Link } from "react-router-dom";

const ProductScreenHeader = ({ product }) => {
  return (
    <div className="mb-4 sm:text-xs">
      <Link to="/" className="text-sm font-normal hover:underline">
        HOME
      </Link>
      &nbsp;/&nbsp;
      <Link
        to={`/${product.primaryCategory}`}
        className="text-sm hover:underline"
      >
        {product.primaryCategory.replace(/-/g, " ").toUpperCase()}
      </Link>
      &nbsp;/&nbsp;
      <Link
        to={`/${product.primaryCategory}/${product.secondaryCategory}`}
        className="text-sm hover:underline"
      >
        {product.secondaryCategory.replace(/-/g, " ").toUpperCase()}
      </Link>
      &nbsp;/&nbsp;
      <Link
        to={`/${product.primaryCategory}/${product.secondaryCategory}/${product.tertiaryCategory}`}
        className="text-sm hover:underline"
      >
        {product.tertiaryCategory.replace(/-/g, " ").toUpperCase()}
      </Link>
      &nbsp;&gt;&nbsp;
      <Link
        to={`/product/${product._id}`}
        className="text-sm font-bold hover:underline"
      >
        {product.name.replace(/-/g, " ").toUpperCase()}
      </Link>
    </div>
  );
};

export default ProductScreenHeader;
