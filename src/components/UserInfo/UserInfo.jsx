import { Avatar } from "@mui/joy";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth";

const UserInfo = () => {
  const { user, logOut } = useAuth();
  const { displayName, photoURL } = user;

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("Sign out successful");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content={displayName || "Not available"}
        >
          <Avatar src={photoURL} />
        </button>
        <Tooltip id="my-tooltip" />
        <button
          onClick={handleSignOut}
          className="px-5 py-2 bg-primary-maroon text-slate-50 rounded hover:bg-opacity-70 hover:scale-105 hidden lg:block"
        >
          <NavLink to={"/"}>Log Out</NavLink>
        </button>
      </div>
    </>
  );
};

export default UserInfo;
