import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/contact",
        element: <div>Contact</div>,
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
      {
        path: "register",
        element: <div>Register</div>,
      }
    ],
  },
]);

export default router;
