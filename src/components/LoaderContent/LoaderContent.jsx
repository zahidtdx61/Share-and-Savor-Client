import { ScaleLoader } from "react-spinners";

const LoaderContent = () => {
  return (
    <div
      className={`min-h-[calc(100vh-400px)] lg:max-w-screen-xl mx-auto  flex flex-col  justify-center  items-center `}
    >
      <ScaleLoader size={40} color="#1ba94c" />
    </div>
  );
};

export default LoaderContent;
