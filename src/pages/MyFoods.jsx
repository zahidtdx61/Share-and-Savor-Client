import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import useSession from "../hooks/useSession";

const MyFoods = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [foodId, setFoodId] = useState("");
  const [fetchData, setFetchData] = useState(false);

  const session = useSession();

  useAsyncEffect(async () => {
    try {
      setIsLoading(true);
      const res = await session.get("/donated-foods");
      // console.log(res.data.donated_foods);
      setFoods(res.data.donated_foods);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [fetchData]);

  if (isLoading) {
    return <LoaderContent pageName={"My Foods"} />;
  }
  return (
    <div className="max-w-screen-xl min-h-[calc(100vh-80px)] mx-auto">
      <Helmet>
        <title>Share and Savor | My Foods</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center">My Foods</h1>
      <div className="w-[95%]  lg:max-w-screen-xl mx-auto overflow-x-auto font-mulish my-8">
        <table className="w-full text-center">
          <thead>
            <tr className="border-b-2">
              <th className="px-4 py-2">Food Name</th>
              <th className="px-4 py-2">Food Image</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Update</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          {foods.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center text-xl font-bold">
                  No Foods Found
                </td>
              </tr>
            </tbody>
          ) : (
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
                    <span
                      className={`${
                        food.status === "Available"
                          ? "bg-green-300 text-green-800"
                          : "bg-yellow-200 text-yellow-600"
                      } px-5 py-1 rounded ml-2 font-bold`}
                    >
                      {food.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(food.expiry_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-green-500 text-white px-5 py-1 rounded-md hover:bg-opacity-75">
                      <Link to={`/update-food/${food._id}`}>Update</Link>
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setFoodId(food._id);
                      }}
                      className="bg-red-500 text-white px-5 py-1 rounded-md hover:bg-opacity-75"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Delete Modal */}
        <DeleteModal
          open={open}
          setOpen={setOpen}
          foodId={foodId}
          setFetchData={setFetchData}
        />
      </div>
    </div>
  );
};

export default MyFoods;
