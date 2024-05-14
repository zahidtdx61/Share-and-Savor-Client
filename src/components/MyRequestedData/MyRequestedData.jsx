import PropTypes from "prop-types";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import useSession from "../../hooks/useSession";

const MyRequestedData = ({ food }) => {
  const [donnerName, setDonnerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  useAsyncEffect(async () => {
    try {
      setIsLoading(true);
      console.log(food.donner);
      const res = await session.get(`/find-user/${food.donner}`);
      setDonnerName(res?.data?.user?.name);
      console.log(res?.data?.user?.name);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );

  return (
    <tr key={food._id} className="border-b">
      <td className="px-4 py-2">{food.food_name}</td>
      <td className="px-4 py-2 flex justify-center items-center">
        <img
          src={food.food_image}
          alt={food.food_name}
          className="w-20 h-20 object-cover"
        />
      </td>
      <td className="px-4 py-2">{food.location}</td>
      <td className="px-4 py-2">{donnerName}</td>
      <td className="px-4 py-2">
        {new Date(food.expiry_date).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        {new Date(food.requested_date).toLocaleDateString()}
      </td>
    </tr>
  );
};

MyRequestedData.propTypes = {
  food: PropTypes.object,
};

export default MyRequestedData;
