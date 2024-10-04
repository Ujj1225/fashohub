import { useState, useEffect } from "react";
import { CopilotTextarea } from "@copilotkit/react-textarea";

const ReviewTextArea = ({ onReviewChange }) => {
  const [review, setReview] = useState("");

  useEffect(() => {
    onReviewChange(review); 
  }, [review, onReviewChange]);

  return (
    <CopilotTextarea
      name="comment"
      rows={4}
      className="border px-2 py-1 rounded w-full"
      value={review}
      onChange={(e) => setReview(e.target.value)}
      onValueChange={setReview} 
      placeholder="Leave a review..."
      autosuggestionsConfig={{
        textareaPurpose:
          "Auto-generate a review. Describe your experience with the product",
        chatApiConfigs: {
          suggestionsApiConfig: {
            maxTokens: 100, 
            stop: ["\n", ".", "?"],
          },
        },
      }}
      maxLength={200} 
      required
    />
  );
};

export default ReviewTextArea;
