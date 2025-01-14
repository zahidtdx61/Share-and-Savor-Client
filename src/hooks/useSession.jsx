import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const session = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useSession = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  session.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      console.log("Error from axios interceptor", error.response);
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut();
        navigate("/login");
        toast.error("Session expired, please login again");
      }
      return Promise.reject(error);
    }
  );

  return session;
};

export default useSession;
