import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import parseDescription from "../../utils/parseDescription";

const ProductDescription = ({ product }) => {
  return (
    <div className="mt-4">
      <h2 className="flex items-center gap-2 text-base font-bold">
        PRODUCT DESCRIPTION{" "}
        <CgDetailsMore
          size={15}
          className="border border-black p-[1px] rounded-sm"
        />
      </h2>
      <div className="">{parseDescription(product.description)}</div>
    </div>
  );
};

export default ProductDescription;
