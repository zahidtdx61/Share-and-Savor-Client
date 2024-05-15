import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import useSession from "../hooks/useSession";

const UpdateFood = () => {
  const { id } = useParams();
  const session = useSession();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());

  const {
    data: food = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["food", { id }],
    queryFn: () => getFoodData(id),
  });

  const getFoodData = async (id) => {
    const response = await session.get(`/find-food/${id}`);
    setExpiryDate(new Date(response.data.food.expiry_date));
    setStartDate(new Date(response.data.food.expiry_date));

    return response?.data?.food;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await session.put(`/update-food/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
      toast.success("Food updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred. Please try again");
    },
  });

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

    const updatedData = {
      ...data,
      expiry_date: startDate,
    };

    await mutateAsync({ id, updatedData });
  };

  if (isLoading || isPending) return <LoaderContent pageName={"Update Food"} />;

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
