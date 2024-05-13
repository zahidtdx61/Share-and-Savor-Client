import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useSession from "../../hooks/useSession";
import FoodCard from "../FoodCard/FoodCard";

const FeaturedFoods = () => {
  const queryClient = useQueryClient();
  const session = useSession();

  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredFoods"],
    queryFn: () => getFoodsData(),
  });

  const getFoodsData = async () => {
    const response = await session("/all-foods?sorted=quantity&page=1&size=6");
    return response.data.foods;
  };

  console.log({ foods, isLoading, isError, error });

  if (isLoading)
    return (
      <div
        className={`min-h-[calc(100vh-400px)] lg:max-w-screen-xl mx-auto  flex flex-col  justify-center  items-center `}
      >
        <ScaleLoader size={40} color="#1ba94c" />
      </div>
    );

  return (
    <div className="w-full mt-12">
      <h2 className="text-4xl font-mulish font-bold text-center">
        Featured Foods
      </h2>
      <p className="text-center text-slate-500 mt-4 lg:w-[70%] mx-auto my-4">
        Introducing our selection of dishes generously portioned to serve a
        crowd. Whether you're hosting a party, celebration, or family gathering,
        these crowd-pleasers are designed to satisfy and bring everyone
        together. Discover the joy of sharing food with our selection that can
        be enjoyed by many!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      <div className="w-full">
        <button className="bg-green-600 block text-white hover:bg-opacity-75 text-xl w-fit mx-auto px-5 py-2 rounded-md">
          <Link to="/available-foods">View All Available Foods</Link>
        </button>
      </div>
    </div>
  );
};

export default FeaturedFoods;
