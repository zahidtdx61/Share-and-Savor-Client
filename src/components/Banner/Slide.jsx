import PropTypes from "prop-types";

const Slide = ({ image }) => {
  return (
    <div className="w-full h-full">
      <img src={image} className="w-full h-full object-cover object-center" />
    </div>
  );
};

Slide.propTypes = {
  image: PropTypes.string,
};

export default Slide;
