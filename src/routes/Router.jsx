import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AddFood from "../pages/AddFood";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-food",
        element: <AddFood />,
      },
    ],
  },
]);

export default router;
