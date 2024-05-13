import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSession from "../../hooks/useSession";
import { ScaleLoader } from "react-spinners";

const FeaturedFoods = () => {
  const queryClient = useQueryClient();
  const session = useSession();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredFoods"],
    queryFn: () => getFoodsData(),
  });

  const getFoodsData = async () => {
    const response = await session("/all-foods?sorted=quantity&page=1&size=6");
    return response.data;
  };

  console.log({ data, isLoading, isError, error });

  if (isLoading)
    return (
      <div
        className={`w-[95%] min-h-[calc(100vh-400px)] lg:max-w-screen-xl mx-auto   rounded-lg  mt-12 mb-8 p-2 md:p-4 lg:p-10  flex flex-col  justify-center  items-center `}
      >
        <ScaleLoader size={40} color="#1ba94c" />
      </div>
    );

  return <div></div>;
};

export default FeaturedFoods;
