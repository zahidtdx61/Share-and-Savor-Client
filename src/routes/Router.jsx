import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyFoods from "../pages/MyFoods";
import MyRequests from "../pages/MyRequests";
import NotFoundPage from "../pages/NotFoundPage";
import Register from "../pages/Register";
import UpdateFood from "../pages/UpdateFood";
import ViewFoodDetails from "../pages/ViewFoodDetails";
import PrivateRoutes from "./PrivateRoutes";

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
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoutes>
            <ViewFoodDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-foods",
        element: (
          <PrivateRoutes>
            <MyFoods />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoutes>
            <MyRequests />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoutes>
            <UpdateFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />,
      },
    ],
  },
]);

export default router;
