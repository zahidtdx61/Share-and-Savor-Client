import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import CustomerReviews from "../components/CustomerReviews/CustomerReviews";
import FeaturedFoods from "../components/FeaturedFoods/FeaturedFoods";
import Newsletter from "../components/Newsletter/Newsletter";
import TypeWriter from "../components/TypeWriter/TypeWriter";

const Home = () => {
  const msg = ["Welcome to Share and Savor"];

  return (
    <>
      <Helmet>
        <title>Share and Savor | Home</title>
      </Helmet>

      <div className="max-w-screen-lg p-4 mx-auto">
        <h1 className="text-4xl font-bold text-center h-[80px] md:h-[50px]">
          <TypeWriter sentences={msg} />
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

      <CustomerReviews />
      <Newsletter />
    </>
  );
};

export default Home;
