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
    { name: "All Tourists Spot", path: "/all-tourist-spot", type: "public" },
    { name: "Add Tourists Spot", path: "/add-tourist-spot", type: "private" },
    { name: "My List", path: "/my-list", type: "private-conditional" },
  ];

  const handleTheme = () => {
    console.log("Hola event");
    console.log("theme", mode);
    setMode(mode === "light" ? "dark" : "light");
  };

  const navStyle = (isActive) => {
    return [
      isActive ? "text-sky-400" : "text-blue-600",
      isActive
        ? "border-[2px] border-sky-400 rounded  px-2 font-semibold"
        : "font-medium px-2 hover:opacity-75",
      "py-1",
    ].join(" ");
  };

  return (
    <div
      className={`w-full ${
        mode === "0" ? "bg-white" : "bg-[#282a36]"
      }  z-50 p-2 lg:py-4 lg:px-8  flex items-center justify-between shadow-lg fixed`}
    >
      <div className="flex-1 lg:flex-none">
        <h1 className="text-xl md:text-[2rem] font-bold  select-none text-blue-400">
          <NavLink to={"/"}>
            Serenity <span className="text-sky-800">Seekers</span>
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
        {mode === "0" ? (
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
            <NavLink to={"/log-in"}>Log In</NavLink>
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
