import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useSession from "../hooks/useSession";

const AddFood = () => {
  // food_name,quantity,expiry_date,food_image,location,notes,status,donner_id
  const { register, handleSubmit, reset } = useForm();
  const session = useSession();
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;
  const [reqLoading, setReqLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [quantityError, setQuantityError] = useState("");

  const addFood = async (data) => {
    setReqLoading(true);
    setQuantityError("");

    if (isNaN(parseInt(data.quantity))) {
      setQuantityError("Quantity should be a number.(Just input number only)");
      setReqLoading(false);
      return;
    }

    if (parseInt(data.quantity) < 1) {
      setQuantityError("Quantity should be greater than 0");
      setReqLoading(false);
      return;
    }
    try {
      const foodData = {
        ...data,
        expiry_date: startDate,
        donner_id: user.uid,
        quantity: parseInt(data.quantity),
      };
      // await session.post("/add-user", {
      //   uid: user.uid,
      // });
      const res = await session.post("/add-food", foodData);
      console.log(res.data);
      reset();
      setReqLoading(false);
      toast.success("Food added successfully for donation");
    } catch (error) {
      console.error(error);
      setReqLoading(false);
    }
  };

  if (reqLoading)
    return (
      <div
        className={`w-[95%] min-h-[calc(100vh-80px)] lg:max-w-screen-xl mx-auto   rounded-lg  mt-12 mb-8 p-2 md:p-4 lg:p-10  flex flex-col  justify-center  items-center `}
      >
        <Helmet>
          <title>Share and Savor | Add Food</title>
        </Helmet>
        <ScaleLoader size={40} color="#1ba94c" />
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-screen-lg p-4 mx-auto">
      <Helmet>
        <title>Share and Savor | Add Food</title>
      </Helmet>
      <div className="w-full h-fit">
        <h1 className="text-3xl font-bold text-center my-8">
          Add Your Food to donate among Peoples
        </h1>
        <div className="w-[70px] h-[70px] mx-auto rounded-full overflow-hidden">
          <img
            src={photoURL}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="font-mulish mx-auto w-fit my-4">
          <p>
            Your Name:{" "}
            <span className="font-semibold text-center ">{displayName}</span>
          </p>
          <p>
            Your Email:{" "}
            <span className="font-semibold text-center ">{email}</span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => addFood(data))}
        className="space-y-5"
      >
        <div>
          <label className="font-medium">Food Name</label>
          <input
            {...register("food_name")}
            required
            placeholder="Enter your food name"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Food Image</label>
          <input
            {...register("food_image")}
            required
            placeholder="Enter your food image URL"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Food Quantity</label>
          <input
            {...register("quantity")}
            required
            placeholder="Enter your food quantity (for how many person)"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
          {quantityError.length > 0 && (
            <p className="text-xs text-red-700 my-0">{quantityError}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Expiry Date</label>
          <DatePicker
            className="mt-2 w-full border border-[#e9ebee] px-3 py-2 rounded-md "
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div>
          <label className="font-medium">Location</label>
          <input
            {...register("location")}
            required
            placeholder="Enter the location"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Notes</label>
          <input
            {...register("notes")}
            required
            placeholder="Enter any notes"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Status</label>
          <select
            {...register("status")}
            defaultValue={"Available"}
            name="status"
            id=""
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Name</label>
          <input
            defaultValue={displayName}
            disabled
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            defaultValue={email}
            disabled
            placeholder="Enter your email"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <input
          type="submit"
          className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150 hover:cursor-pointer"
          value="Add Food"
        />
      </form>
    </div>
  );
};

export default AddFood;
