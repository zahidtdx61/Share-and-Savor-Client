import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import "./index.css";
import router from "./routes/Router.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CssVarsProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <CssBaseline />
            <Toaster />
          </QueryClientProvider>
        </CssVarsProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
