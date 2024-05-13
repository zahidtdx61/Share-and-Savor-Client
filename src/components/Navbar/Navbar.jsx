import { useColorScheme } from "@mui/joy";
import { CiLight } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../UserInfo/UserInfo";
import NavbarSmDevice from "./NavbarSmDevice";

const Navbar = () => {
  const { user } = useAuth();
  const { mode, setMode } = useColorScheme();

  const routes = [
    { name: "Home", path: "/", type: "public" },
    { name: "Available Foods", path: "/available-foods", type: "public" },
    { name: "Add Food", path: "/add-food", type: "private" },
    { name: "My Foods", path: "/my-foods", type: "private-conditional" },
    { name: "My Requests", path: "/my-requests", type: "private-conditional" },
  ];

  const handleTheme = () => {
    console.log("theme", mode);
    setMode(mode === "light" ? "dark" : "light");
  };

  const navStyle = (isActive) => {
    return [
      isActive ? "text-green-300" : "text-green-700",
      isActive
        ? "border-[2px] border-green-300 rounded  px-2 font-semibold"
        : "font-medium px-2 hover:opacity-75",
      "py-1",
    ].join(" ");
  };

  return (
    <div
      className={`w-full ${
        mode === "light" ? "bg-white" : "bg-[#282a36]"
      }  z-50 p-2 lg:py-4 lg:px-8  flex items-center justify-between shadow-lg fixed`}
    >
      <div className="flex-1 lg:flex-none">
        <h1 className="text-xl md:text-[2rem] font-bold  select-none font-lexend">
          <NavLink to={"/"}>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-950 via-green-400 to-red-400 text-transparent bg-clip-text bg-300% animate-gradient">
              Share and Savor
            </span>
          </NavLink>
        </h1>
      </div>

      <div
        className={`gap-4 flex-1 font-bold lg:flex hidden lg:static justify-center`}
      >
        {routes.map((route, index) => {
          if (
            route.type === "public" ||
            route.type === "private" ||
            (user && route.type === "private-conditional")
          ) {
            return (
              <ul key={index}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => navStyle(isActive)}
                >
                  {route.name}
                </NavLink>
              </ul>
            );
          }
        })}
      </div>

      <div onClick={handleTheme} className="mr-2 lg:mr-4 flex items-center">
        {mode === "light" ? (
          <button>
            <CiLight size={30} />
          </button>
        ) : (
          <button>
            <IoMoonOutline size={30} />
          </button>
        )}
      </div>

      {user ? (
        <div className="lg:flex gap-2 hidden lg:static">
          <UserInfo />
        </div>
      ) : (
        <div className={`lg:flex gap-2 hidden lg:static`}>
          <div className="px-5 py-2 bg-primary-navy  text-white rounded hover:bg-opacity-70 hover:scale-105">
            <NavLink to={"/login"}>Log In</NavLink>
          </div>
          <div className="px-5 py-2 bg-primary-sky text-white rounded hover:bg-opacity-70 hover:scale-105">
            <NavLink to={"/register"}>Register</NavLink>
          </div>
        </div>
      )}

      {/* mobile and tab */}
      <NavbarSmDevice routes={routes} mode={mode} navStyle={navStyle} />
    </div>
  );
};

export default Navbar;
