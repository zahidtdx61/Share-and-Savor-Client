import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useSession from "../../hooks/useSession";
import FeaturedFoodLottie from "../FeaturedFoodLottie/FeaturedFoodLottie";
import FoodCard from "../FoodCard/FoodCard";
import LoaderContent from "../LoaderContent/LoaderContent";
import TypeWriter from "../TypeWriter/TypeWriter";

const FeaturedFoods = () => {
  const session = useSession();

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["featuredFoods"],
    queryFn: () => getFoodsData(),
  });

  const getFoodsData = async () => {
    const response = await session("/all-foods?sorted=quantity&page=1&size=6");
    return response.data.foods;
  };

  if (isLoading) return <LoaderContent pageName={"Home"} />;

  const headingMsg = ["Featured Foods"];

  return (
    <div className="w-full mt-12">
      <h2 className="text-4xl font-mulish font-bold text-center h-[50px]">
        <TypeWriter sentences={headingMsg} />
      </h2>
      <div className="w-full flex items-center justify-between flex-col md:flex-row p-4">
        <p className="text-center text-base md:text-xl text-slate-500 mt-4 w-full md:w-1/2 mx-auto my-4">
          Introducing our selection of dishes generously portioned to serve a
          crowd. Whether you&apos;re hosting a party, celebration, or family
          gathering, these crowd-pleasers are designed to satisfy and bring
          everyone together. Discover the joy of sharing food with our selection
          that can be enjoyed by many!
        </p>
        <div className="w-full md: w-1/2 h-[300px]">
          <FeaturedFoodLottie />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      <div className="w-full mt-8">
        <button className="bg-green-600 block text-white hover:bg-opacity-75 text-xl w-fit mx-auto px-5 py-2 rounded-md">
          <Link to="/available-foods">View All Available Foods</Link>
        </button>
      </div>
    </div>
  );
};

export default FeaturedFoods;
