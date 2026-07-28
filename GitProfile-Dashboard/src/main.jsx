import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "./index.css";

// document.documentElement.className = "theme-creamy";
document.documentElement.className = "theme-kanagawa";
// "theme-rose-pine"
// "theme-kanagawa"
// "theme-dracula"
// document.documentElement.className = "theme-mocha";
// document.documentElement.className = "theme-graphite";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
