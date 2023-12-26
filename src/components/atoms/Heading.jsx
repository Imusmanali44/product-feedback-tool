import PropTypes from "prop-types";

const Heading = ({ className, children, element, style }) => {
  const HeadingTag = element ? element : "h4";
  return (
    <HeadingTag className={className} style={style}>
      {children}
    </HeadingTag>
  );
};

Heading.defaultProps = {
  className: "",
  children: null,
  element: "h4",
  style: {},
};

Heading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  element: PropTypes.string,
  children: PropTypes.node,
};

export default Heading;
