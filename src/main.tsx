import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetailsPage from "./pages/UserDetailsPage.tsx";
import { GitHubProvider } from "./contexts/GitHubContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/user/:username",
    Component: UserDetailsPage,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GitHubProvider>
      <RouterProvider router={router} />
    </GitHubProvider>
  </StrictMode>
);
