import { useQuery } from "@tanstack/react-query";
import { CiLocationOn } from "react-icons/ci";
import { FaMountain } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useParams } from "react-router-dom";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import useSession from "../hooks/useSession";

const ViewFoodDetails = () => {
  const session = useSession();
  const { id } = useParams();
  const {
    data: food = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["food", { id }],
    queryFn: () => getFoodData(id),
  });

  const getFoodData = async (id) => {
    const response = await session.get(`/find-food/${id}`);
    return response?.data?.food;
  };

  // console.log({ food, isLoading, isError, error });

  if (isLoading) return <LoaderContent />;

  return (
    <div className="w-[95%] lg:max-w-screen-xl mx-auto font-mulish">
      <div className="w-full relative">
        <img
          src={food.food_image}
          alt={food.food_name}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-35 flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold">{food.food_name}</h1>
        </div>
      </div>

      <div className="mt-4 font-medium flex flex-wrap justify-between">
        <div>
          Current Status :{" "}
          <span
            className={`${
              food.status === "Available"
                ? "bg-green-100 text-green-400"
                : "bg-yellow-100 text-yellow-400"
            } px-5 py-1`}
          >
            {food.status}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <SlCalender /> <span>Expiry Date: </span>
          <span className="font-bold">
            {new Date(food.expiry_date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4">{food.notes}</div>

      <div className="flex gap-1 items-center">
        <FaMountain />
        <span>Quantity: </span>
        <span>For {food.quantity} Person</span>
      </div>
      <div className="flex gap-1 items-center">
        <CiLocationOn />
        <span>Location: </span>
        <span>{food.location}</span>
      </div>

      {
        food.status === "Available" && (
          <div className="w-full my-8">
            <button className="text-green-600 border border-green-600 hover:text-green-400 hover:border-green-400 px-5 py-2 w-full text-center">
              Request Food
            </button>
          </div>
        )
      }
    </div>
  );
};

export default ViewFoodDetails;
