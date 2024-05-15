import PropTypes from "prop-types";
import { useTypewriter } from "react-simple-typewriter";

const TypeWriter = ({ sentences }) => {
  const [text] = useTypewriter({
    words: [...sentences],
    loop: 0,
  });

  return (
    <div className="App">
      <span>{text}</span>
    </div>
  );
};

TypeWriter.propTypes = {
  sentences: PropTypes.array,
};

export default TypeWriter;
