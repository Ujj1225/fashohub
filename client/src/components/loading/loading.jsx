import { Loader, Text, Box } from "@mantine/core";

const LoadingView = () => {
  return (
    <Box
      className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-blue-500 to-indigo-600"
      style={{ minHeight: "300px", padding: "2rem", borderRadius: "12px" }}
    >
      <Loader color="white" size="xl" />
      <Text
        size="lg"
        weight={700}
        mt="md"
        className="animate-pulse"
      >
        Fetching awesome products for you...
      </Text>
    </Box>
  );
};

export default LoadingView;
