import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../../pages/Loader";
import useAuth from "../../hooks/useAuth";

const MainLayout = () => {
  const navigation = useNavigation();
  const { isLoading } = useAuth();

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
