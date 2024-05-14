import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FoodCard from "../components/FoodCard/FoodCard";
import LoaderContent from "../components/LoaderContent/LoaderContent";
import useSession from "../hooks/useSession";

const AvailableFoods = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [layout, setLayout] = useState(3); // ["grid", "list"
  const session = useSession();

  const {
    data: foods = [],
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["availableFoods", { search, sort }],
    queryFn: () => getData(search, sort),
  });

  const { register, handleSubmit, reset } = useForm();

  const getData = async (search, sort) => {
    try {
      const res = await session.get(
        `/all-foods?status=Available&search=${search}&sorted=${sort}`
      );
      return res.data.foods;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (data) => {
    console.log("searching");
    setSearch(data.search);
    reset();
  };

  if (isLoading || isPending) {
    return <LoaderContent pageName={"Available Foods"} />;
  }

  // console.log(foods);
  return (
    <div className="min-h-[calc(100vh-80px)] w-[95%] mx-auto max-w-screen-xl mt-12 font-mulish">
      <h1 className="text-3xl font-bold text-center">All Available Foods</h1>
      <p className="w-full md:w-[80%] lg:w-[60%] mx-auto text-sm mt-4 text-center">
        Discover delicious, home-cooked meals from your neighbors. Browse,
        choose your favorites, and connect with cooks to enjoy homemade
        goodness. Join us in reducing food waste and building community through
        shared meals.
      </p>

      <div className="flex flex-wrap gap-2 w-full mt-8">
        <div className="w-full md:w-[45%] lg:w-[32%] mx-auto">
          <form
            onSubmit={handleSubmit((data) => handleSearch(data))}
            className="relative border rounded border-gray-400 "
          >
            <label htmlFor="Search" className="sr-only">
              {" "}
              Search{" "}
            </label>

            <input
              type="text"
              id="Search"
              {...register("search")}
              placeholder="Search for..."
              className="w-full rounded-md  px-2 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="submit"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </form>
        </div>

        <div className="w-full md:w-[45%] lg:w-[32%] mx-auto">
          <select
            onChange={(e) => setSort(e.target.value)}
            defaultValue={sort || ""}
            className="border-2 w-full  border-gray-400 rounded py-2 px-5 mb-2"
            // {...register("sort")}
          >
            <option disabled value="">
              Sort By
            </option>
            <option value="expiry_date">Expiry Date</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        <div className="w-full md:w-[45%] lg:w-[32%] mx-auto">
          <select
            onChange={(e) => setLayout(e.target.value)}
            defaultValue={layout || "0"}
            className="border-2 w-full  border-gray-400 rounded py-2 px-5 mb-2"
            // {...register("sort")}
          >
            <option disabled value="0">
              Select Layout
            </option>
            <option value="3">Layout 3</option>
            <option value="2">Layout 2</option>
          </select>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${layout} gap-4 mt-8`}
      >
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
