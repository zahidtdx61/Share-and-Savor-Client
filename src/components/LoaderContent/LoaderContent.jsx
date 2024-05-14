import { Helmet } from "react-helmet-async";
import { ScaleLoader } from "react-spinners";
import PropTypes from "prop-types";

const LoaderContent = ({pageName}) => {
  return (
    <div
      className={`min-h-[calc(100vh-80px)] lg:max-w-screen-xl mx-auto  flex flex-col  justify-center  items-center `}
    >
      <Helmet>
        <title>Share and Savor | {pageName}</title>
      </Helmet>
      <ScaleLoader size={40} color="#1ba94c" />
    </div>
  );
};

LoaderContent.propTypes = {
  pageName: PropTypes.string,
};

export default LoaderContent;
