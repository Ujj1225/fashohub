import { useState, useEffect } from "react";
import axios from "axios";

export const useBag = () => {
  const [bagItems, setBagItems] = useState([]);

  useEffect(() => {
    const fetchBagItems = async () => {
      try {
        console.log("trying to fetch items from bag");
        const { data } = await axios.get(
          "http://localhost:8001/api/users/bag/mine",
          {
            withCredentials: true, 
          }
        );
        setBagItems(data);
      } catch (error) {
        console.error("Error fetching bag items:", error);
      }
    };

    fetchBagItems();
  }, []);

  return bagItems;
};
