import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import Loader from "../../pages/Loader";

const MainLayout = () => {
  const navigation = useNavigation();
  const { isLoading } = useAuth();

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
