import { CopilotTask, useCopilotContext } from "@copilotkit/react-core";
import { Box, Button } from "@mantine/core";
import ViewedProducts from "../../utils/viewedProducts";

export function ProductRecommendations() {
  const context = useCopilotContext();
  const { viewedProducts, handleViewClear } = ViewedProducts();

  const recommendationTask = new CopilotTask({
    instructions: "Recommend products based on recently viewed items.",
    actions: [
      {
        name: "recommendProducts",
        description:
          "Recommend similar products based on user viewing history.",
        argumentAnnotations: [
          {
            name: "viewedProducts",
            type: "array",
            description: "Array of recently viewed products.",
            required: true,
          },
        ],

        implementation: async (message) => {
          console.log(message);
        },
      },
    ],
  });

  const executeTask = async () => {
    await recommendationTask.run(context, {viewedProducts});
  };
  const handleClear = () => {
    handleViewClear();
    console.log("Viewed products cleared.");
  };

  return (
    <Box className="mt-4 ml-4 mr-4 flex justify-between">
      <Button onClick={executeTask}>Get Recommendations</Button>
      <Button onClick={handleClear}>Clear Recommendations</Button>
    </Box>
  );
}

export default ProductRecommendations;
