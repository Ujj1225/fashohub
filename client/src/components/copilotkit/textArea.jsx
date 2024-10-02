import { useState, useEffect } from "react";
import { CopilotTextarea } from "@copilotkit/react-textarea";

const TextAreaComponent = ({
  onDescriptionChange,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    onDescriptionChange(text); 
  }, [text, onDescriptionChange]);

  return (
    <CopilotTextarea
      className="w-full p-4 border border-gray-300 rounded-md"
      value={text}
      onChange={(e)=> setText(e.target.value)}
      onValueChange={setText}
      placeholder="Generate product description..."
      autosuggestionsConfig={{
        textareaPurpose: "Auto-generate a product description. Remember all the product details",
        chatApiConfigs: {
          suggestionsApiConfig: {
            maxTokens: 150,
            stop: ["\n", ".", "?"],
          },
        },
      }}
    />
  );
};

export default TextAreaComponent;
