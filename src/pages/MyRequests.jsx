import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import MyRequestedData from "../components/MyRequestedData/MyRequestedData";
import useSession from "../hooks/useSession";

const MyRequests = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const session = useSession();

  useAsyncEffect(async () => {
    try {
      setIsLoading(true);
      const res = await session.get("/requested-foods");
      console.log(res.data);
      setFoods(res.data.requested_foods);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <LoaderContent />;
  }

  const tableHeading = [
    "Food Name",
    "Food Image",
    "Pickup Location",
    "Donar Name",
    "Expiry Date",
    "Request Date",
  ];

  return (
    <div className="w-[95%] lg:max-w-screen-xl mx-auto overflow-x-auto">
      <table className="w-full text-center">
        <thead>
          <tr className="border-b-2">
            {tableHeading.map((heading, index) => (
              <th key={index} className="px-4 py-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <MyRequestedData key={food._id} food={food} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequests;
