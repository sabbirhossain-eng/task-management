import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import { Toaster } from "react-hot-toast";
import AuthProviders from "./Provider/AuthProvider";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviders>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </AuthProviders>
  </React.StrictMode>
);
