import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import Loader from "../../pages/Loader";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  const navigation = useNavigation();
  const { isLoading } = useAuth();

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="w-full h-20">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
