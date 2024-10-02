import React from "react";

const ProductScreenImages = ({ product }) => {
  return (
    <div
      className={`grid gap-2 ${
        product.image2
          ? "w-3/5 grid-cols-2 lg:w-1/2 sm:w-full"
          : "w-[30%] sm:w-fit"
      }`}
    >
      <div className="h-[530px] lg:h-[400px] overflow-hidden relative group">
        <img
          src={product.image1}
          alt="image1"
          className="h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 z-10 group-hover:z-20"
        />
      </div>
      {product.image2 && (
        <div className="h-[530px] lg:h-[400px] overflow-hidden relative group">
          <img
            src={product.image2}
            alt="image2"
            className="h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 z-10 group-hover:z-20"
          />
        </div>
      )}
      {product.image3 && (
        <div className="h-[530px] lg:h-[400px] overflow-hidden relative group">
          <img
            src={product.image3}
            alt="image3"
            className="h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 z-10 group-hover:z-20"
          />
        </div>
      )}
      {product.image4 && (
        <div className="h-[530px] lg:h-[400px] overflow-hidden relative group">
          <img
            src={product.image4}
            alt="image4"
            className="h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 z-10 group-hover:z-20"
          />
        </div>
      )}
      {product.image5 && (
        <div className="h-[530px] lg:h-[400px] overflow-hidden relative group">
          <img
            src={product.image5}
            alt="image5"
            className="h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 z-10 group-hover:z-20"
          />
        </div>
      )}
      {product.image6 && (
        <div className="h-[530px] lg:h-[400px] overflow-hidden relative group">
          <img
            src={product.image6}
            alt="image6"
            className="h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 z-10 group-hover:z-20"
          />
        </div>
      )}
    </div>
  );
};

export default ProductScreenImages;
