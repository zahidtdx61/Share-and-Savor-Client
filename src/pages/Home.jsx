import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import FeaturedFoods from "../components/FeaturedFoods/FeaturedFoods";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Share and Savor | Home</title>
      </Helmet>

      <div className="max-w-screen-lg p-4 mx-auto">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Share and Savor
        </h1>
        <p className="mt-2 text-lg text-center">
          Share and Savor is a platform where you can share food with others and
          savor the joy of giving.
        </p>
      </div>

      <Banner />

      <div className="min-h-[calc(100vh-80px)] max-w-screen-lg mx-auto">
        <FeaturedFoods />
      </div>
    </>
  );
};

export default Home;
