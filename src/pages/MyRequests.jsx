import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
      // console.log(res.data);
      setFoods(res.data.requested_foods);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoaderContent pageName={"My Requests"} />;
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
    <div className="max-w-screen-xl mx-auto">
      <Helmet>
        <title>Share and Savor | My Requests</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center my-4">Requested Foods</h1>
      <div className="w-[95%] lg:max-w-screen-xl mx-auto overflow-auto lg:overflow-hidden font-mulish">
        <table className="w-full text-center overflow-x-auto">
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
    </div>
  );
};

export default MyRequests;
