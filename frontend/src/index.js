import React from "react";
import ReactDOM from "react-dom/client"; // listen to url changes
import { BrowserRouter } from "react-router-dom"; // listen to url changes
import i18n from "./i18n";

import App from "./App";

// Starting point of the React.js App.
// Used BrowserRouter to dynamicaly load pages and update page content
// keeps UI in sync with the URL.
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);
