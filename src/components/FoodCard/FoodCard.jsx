import { Divider, useColorScheme } from "@mui/joy";
import PropTypes from "prop-types";
import { CiLocationOn } from "react-icons/ci";
import { FaMountain } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { mode } = useColorScheme();
  const navigate = useNavigate();
  const { food_name, food_image, quantity, expiry_date, location, status } =
    food;
  return (
    <div
      className={`shadow-lg ${
        mode === "dark" && "bg-zinc-700"
      }  rounded-md overflow-hidden w-full flex flex-col font-mulish`}
    >
      <div className="w-full h-[250px] relative">
        <img
          src={food_image}
          className="w-full h-full object-cover hover:scale-105 duration-1000"
        />
        <div className="absolute top-3 -left-1 bg-zinc-200 text-slate-700 px-5 py-1 rounded">
          {status}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold p-2">{food_name}</h2>
      </div>
      <div className="flex-1 p-4">
        <div className="flex gap-1 items-center">
          <FaMountain />
          <span>Quantity: </span>
          <span>For {quantity} Person</span>
        </div>
        <div className="flex gap-1 items-center">
          <SlCalender /> <span>Expiry Date: </span>
          <span>{new Date(expiry_date).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-1 items-center">
          <CiLocationOn />
          <span>Location: </span>
          <span>{location}</span>
        </div>
      </div>
      <Divider />
      <div className="w-full p-4">
        <button onClick={() => navigate(`/food/${food._id}`)} className="text-green-600 border border-green-600 hover:text-green-400 hover:border-green-400 px-5 py-2 w-full text-center">
          View Details
        </button>
      </div>
    </div>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
};

export default FoodCard;
