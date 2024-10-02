import React from "react";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useProducts } from "../hooks/useProducts";
// import { useNavigate } from "react-router-dom";

import "@copilotkit/react-ui/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "react-toastify/ReactToastify.css";

const App = () => {
  // const navigate = useNavigate();
  const products = useProducts();

  useCopilotReadable({
    description: "The state of the products List",
    value: JSON.stringify(products),
  });

  useCopilotAction({
    name: "viewProduct",
    description: "View a product",
    parameters: [
      {
        name: "category",
        type: "string",
        required: true,
      },
    ],
    handler({ category }) {
      const view = products.filter(
        (product) =>
          product.primaryCategory.toLowerCase() === category.toLowerCase()
      );

      // navigate(`/${category.toLowerCase()}`);

      return {
        message: `Here are the products for category ${category}:`,
        products: view,
      };
    },
  });

  useCopilotAction({
    name: "filterProducts",
    description: "Filter products by category, price, and discount.",
    parameters: [
      {
        name: "primaryCategory",
        type: "string",
        required: true,
      },
      {
        name: "sort",
        type: "string",
        required: false,
      },
      {
        name: "discounts",
        type: "string",
        required: false,
      },
      {
        name: "priceRanges",
        type: "string",
        required: false,
      },
    ],
    async handler({ primaryCategory, sort, discounts, priceRanges }) {
      try {
        const queryParams = [];

        if (sort) queryParams.push(`sort=${sort}`);

        if (discounts) {
          const cleanDiscount = discounts.replace("%", "");
          queryParams.push(`discounts=${cleanDiscount}+`);
        }

        if (priceRanges) queryParams.push(`priceRanges=${priceRanges}`);

        const queryString = queryParams.join("&");

        const url = `http://localhost:8001/api/products/primary/${primaryCategory}?${queryString}`;

        console.log(url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        return {
          message: `Here are the filtered products for category ${primaryCategory}:`,
          products: data,
        };
      } catch (error) {
        return { message: "Error fetching filtered products." };
      }
    },
  });

  return (
    <MantineProvider>
      <div className="font-custom">
        <AppRoute />
        <ToastContainer className="mt-10" />
        <CopilotPopup
          instructions="You are a knowledgeable assistant specializing in shopping. Provide helpful and accurate recommendations for products, deals, and shopping tips to enhance the user's shopping experience.
          When displaying products format it and use lines in between the product to make them look nice and easily readable. Add a new line between each product. 
          
          Finally remember to be polite and ask if you want to place order.  
          "
          labels={{
            title: "Fashohub Assistant",
            initial: "Hi! 👋 How can I help you with your shopping today?",
          }}
        />
      </div>
    </MantineProvider>
  );
};

export default App;
