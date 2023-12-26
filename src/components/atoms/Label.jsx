import { memo } from "react";
import PropTypes from "prop-types";

const Label = ({ className, children, element, style }) => {
  const LabelTag = element ? element : "p";
  return <LabelTag className={className} style={style}>{children}</LabelTag>;
};

Label.defaultProps = {
  className: "",
  children: null,
  element: "p",
  style: {}
};

Label.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  element: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Label);
