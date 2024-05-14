import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import useSession from "../hooks/useSession";

const MyFoods = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const session = useSession();

  useAsyncEffect(async () => {
    try {
      setIsLoading(true);
      const res = await session.get("/donated-foods");
      console.log(res.data.donated_foods);
      setFoods(res.data.donated_foods);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <LoaderContent />;
  }
  return (
    <div className="w-[95%] lg:max-w-screen-xl mx-auto overflow-x-auto font-mulish my-8">
      <h1 className="text-3xl font-bold text-center">My Foods</h1>
      <table className="w-full text-center">
        <thead>
          <tr className="border-b-2">
            <th className="px-4 py-2">Food Name</th>
            <th className="px-4 py-2">Food Image</th>
            <th className="px-4 py-2">Expiry Date</th>
            <th className="px-4 py-2">Update</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id} className="border-b">
              <td className="px-4 py-2">{food.food_name}</td>
              <td className="px-4 py-2 flex justify-center items-center">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="w-20 h-20 object-cover object-center"
                />
              </td>
              <td className="px-4 py-2">
                {new Date(food.expiry_date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <button className="bg-green-500 text-white px-5 py-1 rounded-md hover:bg-opacity-75">
                  Update
                </button>
              </td>
              <td className="px-4 py-2">
                <button className="bg-red-500 text-white px-5 py-1 rounded-md hover:bg-opacity-75">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoods;
