import { getPrimaryCategoryProduct } from "../controllers/productController";

export const runtime = new CopilotRuntime({
  actions: () => {
    return [
      {
        name: "filterProducts",
        description:
          "Fetch products based on category, price, discount, and sorting.",
        parameters: [
          {
            name: "primaryCategory",
            type: "string",
            description: "Primary category of products",
            required: true,
          },
          {
            name: "sort",
            type: "string",
            description: "Sorting criteria like 'new', 'discount', 'rating'",
            required: false,
          },
          {
            name: "discounts",
            type: "string",
            description: "Discount range (comma-separated)",
            required: false,
          },
          {
            name: "priceRanges",
            type: "string",
            description:
              "Price ranges in the format '<value', '>value', or 'min-max'",
            required: false,
          },
        ],
        handler: async ({ primaryCategory, sort, discounts, priceRanges }) => {
          const req = {
            params: { primary: primaryCategory },
            query: { sort, discounts, priceRanges },
          };
          const res = {
            send: (data) => data, 
          };

          const products = getPrimaryCategoryProduct(req, res);
          return products; 
        },
      },
    ];
  },
});
