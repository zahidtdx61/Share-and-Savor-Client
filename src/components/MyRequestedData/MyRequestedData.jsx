import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import useSession from "../../hooks/useSession";

const MyRequestedData = ({ food }) => {
  const session = useSession();

  const { data: donnerName = "", isLoading } = useQuery({
    queryKey: ["find-user", { id: food.donner }],
    queryFn: () => getDonnerName(),
  });

  const getDonnerName = async () => {
    const res = await session.get(`/find-user/${food.donner}`);
    return res?.data?.user?.name;
  };

  if (isLoading)
    return (
      <tr>
        <td>
          <ClipLoader color="#1ba94c" />
        </td>
        <td>
          <ClipLoader color="#1ba94c" />
        </td>
        <td>
          <ClipLoader color="#1ba94c" />
        </td>
        <td>
          <ClipLoader color="#1ba94c" />
        </td>
        <td>
          <ClipLoader color="#1ba94c" />
        </td>
        <td>
          <ClipLoader color="#1ba94c" />
        </td>
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
  food: PropTypes.object.isRequired,
};

export default MyRequestedData;
