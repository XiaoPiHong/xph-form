import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Test from "./Test.tsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "orange",
      },
    }}
  >
    <App />
  </ConfigProvider>
  // </React.StrictMode>
);
