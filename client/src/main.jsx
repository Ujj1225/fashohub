import React from "react";
import "@copilotkit/react-ui/styles.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { CopilotKit } from "@copilotkit/react-core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CopilotKit runtimeUrl="http://localhost:8001/api/copilotkit">
      <Provider store={store}>
        <App />
      </Provider>
    </CopilotKit>
  </React.StrictMode>
);
