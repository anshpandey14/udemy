import { createRoot } from "react-dom/client";

import App from "./App.jsx";

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click me to visit google",
};

createRoot(document.getElementById("root")).render(<App />);
