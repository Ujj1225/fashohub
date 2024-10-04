import React from "react";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";
import { MantineProvider, Card, Image, Text } from "@mantine/core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useProducts } from "../hooks/useProducts";
import LoadingView from "./components/loading/loading";
// import { useNavigate } from "react-router-dom";

import "@copilotkit/react-ui/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "react-toastify/ReactToastify.css";
// import { useBag } from "../hooks/useBag";

const App = () => {
  // const navigate = useNavigate();
  // const [bagData, setBagData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const bag = useBag();
  const products = useProducts();

  // useEffect(() => {
  //   if (bag) {
  //     setBagData(bag);
  //     setLoading(false);
  //   }
  // }, [bag]);

  // {
  //   console.log(products);
  // }

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

  useCopilotAction({
    name: "showProducts",
    description: "Show products based on category",
    parameters: [
      {
        name: "category",
        type: "string",
        required: true,
      },
    ],
    render: ({ status, args }) => {
      const { category } = args;

      console.log(status, args);

      if (status === "inProgress") {
        return <LoadingView />;
      }

      if (!category) {
        return <div>No category provided!</div>;
      }

      const filteredProducts = products.filter(
        (product) =>
          product.primaryCategory.toLowerCase() === category.toLowerCase()
      );

      if (filteredProducts.length === 0) {
        return <div>No Products found in the {category} category!</div>;
      }

      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            padding: "20px",
            width: "35px",
            backgroundColor: "#f4f6f8",
          }}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              shadow="lg"
              padding="md"
              radius="md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                backgroundColor: "#fff",
                border: "1px solid #e9ecef",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
              withBorder
            >
              {product.discountPercentage && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "-10px",
                    backgroundColor: "#ff6b6b",
                    color: "#fff",
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    transform: "rotate(-20deg)",
                    zIndex: 1,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {product.discountPercentage}% OFF
                </div>
              )}

              <Card.Section style={{ textAlign: "center", paddingTop: "20px" }}>
                <Image
                  src={product.image1}
                  height={120}
                  alt={product.name}
                  style={{
                    objectFit: "contain",
                    aspectRatio: "1/1",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    padding: "8px",
                    backgroundColor: "#f1f3f5",
                  }}
                />
              </Card.Section>

              <div style={{ padding: "0 10px", textAlign: "center" }}>
                <Text
                  weight={600}
                  size="lg"
                  style={{ color: "#212529", marginBottom: "6px" }}
                >
                  {product.name}
                </Text>
                <Text size="sm" weight={500} style={{ marginBottom: "6px" }}>
                  {product.brand}
                </Text>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <Text
                    size="lg"
                    weight={700}
                    style={{
                      color: "#1c7ed6",
                      fontSize: "18px",
                    }}
                  >
                    ${product.sellingPrice}
                  </Text>
                  <Text
                    size="sm"
                    weight={500}
                    style={{
                      textDecoration: "line-through",
                      fontSize: "14px",
                    }}
                  >
                    ${product.actualPrice}
                  </Text>
                </div>

                {product.off && (
                  <Text
                    size="xs"
                    style={{ color: "#ff6b6b", marginTop: "6px" }}
                  >
                    You save $
                    {(product.actualPrice - product.sellingPrice).toFixed(2)}
                  </Text>
                )}
              </div>
            </Card>
          ))}
        </div>
      );
    },
  });

  return (
    <MantineProvider>
      <div className="font-custom">
        <AppRoute />
        <ToastContainer className="mt-10" />
        <CopilotPopup
          instructions="You are a knowledgeable assistant specializing in shopping. If they say husband then make sure the category is men dont show products for kids. If its wife then make sure the category is women. If its brother, cousin or something like that take it to kids and men as well. Remember make category as per request. 

          If they say display or show then display the image of product. If the request is tell then just show in a simple nicely formatted list.

          Provide helpful and accurate recommendations for products, deals, and shopping tips to enhance the user's shopping experience.

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
