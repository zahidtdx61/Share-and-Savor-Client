import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import useSession from "../hooks/useSession";

const UpdateFood = () => {
  const { id } = useParams();
  const session = useSession();
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useAsyncEffect(async () => {
    try {
      setIsLoading(true);
      const res = await session.get(`/find-food/${id}`);
      // console.log(res.data.food);
      setFood(res.data.food);
      setExpiryDate(new Date(res.data.food.expiry_date));
      setStartDate(new Date(res.data.food.expiry_date));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  const { food_name, food_image, quantity, location, notes, status } = food;

  const updateFood = async (data) => {
    if (
      data.food_name === food_name &&
      data.food_image === food_image &&
      parseInt(data.quantity) === quantity &&
      data.location === location &&
      data.notes === notes &&
      data.status === status &&
      new Date(startDate).getTime() === new Date(expiryDate).getTime()
    ) {
      toast.error("Please update the fields to update the food");
      return;
    }

    // console.log(data.food_name === food_name);
    // console.log(data.food_image === food_image);
    // console.log(parseInt(data.quantity) === quantity);
    // console.log(data.location === location);
    // console.log(data.notes === notes);
    // console.log(data.status === status);
    // console.log(new Date(startDate).getTime() === new Date(expiryDate).getTime());

    const updatedData = {
      ...data,
      expiry_date: startDate,
    };

    try {
      setIsLoading(true);
      const res = await session.put(`/update-food/${id}`, updatedData);
      console.log(res.data);
      setIsLoading(false);
      toast.success("Food updated successfully");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoaderContent pageName={"Update Food"} />;

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-screen-lg p-4 mx-auto font-mulish">
      <Helmet>
        <title>Share and Savor | Update Food</title>
      </Helmet>
      <div className="w-full h-fit">
        <h1 className="text-3xl font-bold text-center">Update Food</h1>
        <div className="w-[250px] h-[150px] mx-auto my-4">
          <img
            src={food_image}
            className="h-full w-full object-cover object-center rounded-md"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => updateFood(data))}
        className="space-y-5"
      >
        <div>
          <label className="font-medium">Food Name</label>
          <input
            {...register("food_name")}
            required
            defaultValue={food_name}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Food Image</label>
          <input
            {...register("food_image")}
            required
            defaultValue={food_image}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Food Quantity</label>
          <input
            {...register("quantity")}
            required
            defaultValue={quantity}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Expiry Date</label>
          <ReactDatePicker
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
            defaultValue={location}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Notes</label>
          <input
            {...register("notes")}
            required
            defaultValue={notes}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Status</label>
          <select
            {...register("status")}
            defaultValue={status}
            name="status"
            id=""
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
            <option value="Requested">Requested</option>
          </select>
        </div>

        <input
          type="submit"
          className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150 hover:cursor-pointer"
          value="Update Food"
        />
      </form>
    </div>
  );
};

export default UpdateFood;
