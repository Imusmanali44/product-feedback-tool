import PropTypes from "prop-types";

const Section = ({ className, style, children }) => {
  return (
    <section className={className} style={style}>
      {children}
    </section>
  );
};

Section.defaultProps = {
  className: "",
  style: {},
  children: null,
};

Section.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Section;
