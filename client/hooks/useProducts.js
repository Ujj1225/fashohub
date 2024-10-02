import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:8001/api/products"); 
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return products;
};
