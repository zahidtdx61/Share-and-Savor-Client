import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import MyRequestedData from "../components/MyRequestedData/MyRequestedData";
import useSession from "../hooks/useSession";

const MyRequests = () => {
  const session = useSession();

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["requestedFoods"],
    queryFn: () => getRequestedFoods(),
  });

  const getRequestedFoods = async () => {
    const res = await session.get("/requested-foods");
    return res.data.requested_foods;
  };

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
    <div className="max-w-screen-xl min-h-[calc(100vh-80px)] mx-auto">
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
                <MyRequestedData key={food._id} food={food} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default MyRequests;
