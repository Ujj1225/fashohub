import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ViewedProducts() {
  const [viewedProducts, setViewedProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const productId = location.pathname.split("/").pop();

    if (!viewedProducts.some((product) => product.id === productId)) {
      fetchProductDetails(productId);
    }
  }, [location]);

  const fetchProductDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/api/products/${id}`
      );

      setViewedProducts((prevViewedProducts) => {
        if (!prevViewedProducts.some((product) => product.id === data.id)) {
          return [...prevViewedProducts, data];
        }
        return prevViewedProducts; 
      });

      console.log("Viewed products updated:", viewedProducts);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleViewClear = () => {
    setViewedProducts([]);
  };

  return {
    viewedProducts,
    handleViewClear,
  };
}

export default ViewedProducts;
