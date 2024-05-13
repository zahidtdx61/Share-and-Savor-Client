import { CssBaseline, CssVarsProvider } from "@mui/joy";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import "./index.css";
import router from "./routes/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CssVarsProvider>
          <RouterProvider router={router} />
          <CssBaseline />
          <Toaster />
        </CssVarsProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
