import { PropTypes } from "prop-types";

const Loader = ({ style }) => {
  return (
    <div className="loader-container">
      <div className="loader" style={style}></div>
    </div>
  );
};


Loader.propTypes = {
  style: PropTypes.object,
};

export default Loader;
