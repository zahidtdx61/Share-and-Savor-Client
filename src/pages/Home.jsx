import { Helmet } from "react-helmet-async";

import { useColorScheme } from "@mui/joy";

const Home = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Helmet>
        <title>Share and Savor | Home</title>
      </Helmet>
      <div>Home</div>

      <main>
        <button
          className="px-5 py-1 bg-red-500 text-white rounded m-4"
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        >
          Change Theme
        </button>
        <div>Hello</div>
      </main>
    </>
  );
};

export default Home;
